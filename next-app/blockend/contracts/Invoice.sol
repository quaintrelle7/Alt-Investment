// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceFactory {
    address[] public deployedInvoices;
    address[] public signedContracts;
    mapping(address => bool) public activeInvoices;
    mapping(address=>bool) public factors;
    address public admin;

    constructor(){
        factors[msg.sender] = true;
        admin = msg.sender;
    }

    function createID(string calldata ipfsHash) public returns (address) {
        address newID = address(new Invoice(ipfsHash, msg.sender, address(this)));
        deployedInvoices.push(newID);
        activeInvoices[newID] = true;
        return newID;
    }

    modifier onlyValidInvoice() {
        require(activeInvoices[msg.sender], "Only valid Invoice contracts can call this function.");
        _;
    }

    modifier onlyAdmin(){
        require(msg.sender==admin, "Only Admin can call this function");
        _;
    }

    function addFactor(address _factor) public onlyAdmin{
        factors[_factor]=true;
    }

    function removeFactor(address _factor) public onlyAdmin{
        factors[_factor] = false;
    }

    function getDeployedContracts() public view returns (address[] memory) {
        return deployedInvoices;
    }

    function getSignedContracts() public view returns (address[] memory) {
        return signedContracts;
    }

    function addSignedContract(address contractAddress) external onlyValidInvoice {
        require(activeInvoices[contractAddress], "Only the invoice contract can call this function.");
        signedContracts.push(contractAddress);
    }

    function removeSignedContract(address contractAddress) external onlyValidInvoice{
        require(activeInvoices[contractAddress], "Only the invoice contract can call this function.");

        for (uint i = 0; i < signedContracts.length; i++) {
            if (signedContracts[i] == contractAddress) {
                signedContracts[i] = signedContracts[signedContracts.length - 1];
                signedContracts.pop();
                break;
            }
        }
    }

    function markinvoiceInactive(address contractAddress) external onlyValidInvoice {
         require(activeInvoices[contractAddress], "Only the invoice contract can call this function.");
         activeInvoices[contractAddress] = false;
    }
}



contract Invoice{


    address public seller;
    string public invoiceHash;
    string public agreementHash;
    address public factor;
    address public recourse_payer;

    string public sellerName;
    string public buyerName;
    uint256 public xirr;
    
    uint256 public totalInvoiceAmount;
    uint256 private fees;
    uint256 public amountPerUnit;
    uint256 public repaymentPerUnit;
    uint256 public totalUnits;
    uint256 public purchasedUnits = 0;
    uint256 public tenure;

    uint256 private expected_repayment_date;
    uint256 private expected_payout_date;

    uint256 private totalInvestedAmount = 0;
    uint256 private paidAmount;

    address public factoryAddress;

    uint256 private totalPayableAmount;

    enum Status { PROCESSING, APPROVED, FACTOR_APPROVED, DECLINED, PURCHASED, COMPLETED}
    Status status;
    
    struct Investor{
        address investor_address;
        uint256 invested_amount;
        uint256 repayment_amount;
        uint256 total_units;
    }

    struct InvoiceInfo{
        string  invoiceHash;
        string  agreementHash;

        string  sellerName;
        string  buyerName;
        uint256  xirr;
        
        uint256  totalInvoiceAmount;
        uint256  fees;
        uint256  amountPerUnit;
        uint256  repaymentPerUnit;
        uint256  totalUnits;
        uint256  purchasedUnits;
        uint256  tenure;
    }

        Investor[] public investors;


    modifier _onlySeller{
        require(msg.sender==seller, "Agreement should be signed by invoice seller.");
        _;
    }

    modifier _onlyFactor{
        require(InvoiceFactory(factoryAddress).factors(msg.sender), "Only factor can call this function.");
        _;
    }


    modifier _onlyPayer{
        _;
    }


    bool agreementSigned = false;


    modifier _invoiceApproved{
        require(agreementSigned, "Agreement approval required.");
        _;
    }

    
   
    event InvoicePaid(uint256 amountPaid, address payer);
    event InvoicePurchased(address investor);
    event InvoiceApproved(address factor);
    event InvoiceSigned(address seller);
    event MoneyTransferToSeller(address seller, uint256 amount);
    event FeesTransferToFactor(address factor, uint256 amount);
    event MoneyTransferToInvestor(address investor, uint256 amount);
    event Log(bool success, string text);



    constructor(
        string memory _ipfsHash,
        address _seller,
        address _factoryAddress
    ){
        seller = _seller;
        recourse_payer = seller;
        invoiceHash = _ipfsHash;
        factoryAddress = _factoryAddress;
    }


    function approveInvoice(
        uint256 _totalInvoiceAmount, 
        uint256 _amountPerunit, 
        uint256 _repaymentPerUnit, 
        uint256 _totalUnits,
        uint256 _tenure,
        string memory _agreementHash, 
        uint256 _fees,
        string memory _sellerName,
        string memory _buyerName,
        uint256 _xirr
        )  _onlyFactor external{
        
        // require(factor == msg.sender, "Only factor can approve invoice");
        assert(fees<_totalInvoiceAmount);

        factor = msg.sender;
        totalInvoiceAmount = _totalInvoiceAmount *(10**9);
        agreementHash = _agreementHash;
        fees = _fees * (10**9);
        amountPerUnit = _amountPerunit * (10**9);
        repaymentPerUnit = _repaymentPerUnit * (10**9);
        totalUnits = _totalUnits;
        totalPayableAmount = (totalUnits * repaymentPerUnit) + fees;
        
        status = Status.FACTOR_APPROVED;
        tenure = _tenure;
        sellerName = _sellerName;
        buyerName = _buyerName;
        xirr = _xirr;

        emit InvoiceApproved(factor); 
    }


    function declineInvoice() external _onlyFactor{
        agreementSigned = false;
        status=Status.DECLINED;
    }


    function signAgreement() external _onlySeller {
        //Think on how to get it signed by Payer and Seller
        //Request should go to seller's and payer's dashboard to sign - but apart from that
        //It should be signed just by the seller - perhaps. Confirm on this with AB
        require(status == Status.FACTOR_APPROVED, "Aggrement is not approved by factor.");
        agreementSigned = true;
        status = Status.APPROVED;
        InvoiceFactory(factoryAddress).addSignedContract(address(this));
        emit InvoiceSigned(msg.sender);
    }

    function transferMoneyToSeller() internal  _invoiceApproved{
        require(totalInvestedAmount == totalInvoiceAmount, "Invested amount does not match invoice amount");
        // payable(seller).transfer(address(this).balance);
        (bool success, ) = payable(seller).call{value: address(this).balance}("");
        require(success, "Transfer to seller failed");
        totalInvestedAmount = 0;
        emit MoneyTransferToSeller(seller, address(this).balance);
    }


    function purchaseInvoice(uint256 totalPurchasedUnits) payable external _invoiceApproved{
        require((totalPurchasedUnits*amountPerUnit)==msg.value, "Keep proper balance.");
       
        Investor memory investor;
        
        investor.investor_address = msg.sender;
        investor.invested_amount = msg.value;
        investor.repayment_amount = totalPurchasedUnits * repaymentPerUnit;
        investor.total_units = totalPurchasedUnits;

        investors.push(investor);

        totalInvestedAmount += (totalPurchasedUnits * amountPerUnit);
        purchasedUnits += totalPurchasedUnits;

        emit InvoicePurchased(msg.sender);  

        if(purchasedUnits==totalUnits){
            transferMoneyToSeller();
            InvoiceFactory(factoryAddress).removeSignedContract(address(this));
        } 
    }

     function  transferFeeToFactor() internal _invoiceApproved{
        (bool success, ) = payable(factor).call{value: address(this).balance}("");
        require(success, "Transfer to factor failed");
        status= Status.COMPLETED;
        InvoiceFactory(factoryAddress).markinvoiceInactive(address(this));

        emit FeesTransferToFactor(factor, address(this).balance);
        
    }

    function transferMoneyToInvestor() internal _invoiceApproved{

        for(uint256 i=0; i < investors.length; i++){
            address investorAddress = investors[i].investor_address;
            uint256 repaymentAmount = investors[i].repayment_amount;

            (bool success, ) = payable(investorAddress).call{value: repaymentAmount}("");
            require(success, "Transfer to investor failed");
        }

        // emit MoneyTransferToInvestor(investors[0], paidAmount-fees);
    }

    function getPayableAmount() public view returns (uint) {
        return totalUnits * repaymentPerUnit + fees;
    }

    function payInvoiceAmount() payable external _invoiceApproved{
       require(msg.value == ((totalUnits * repaymentPerUnit) + fees)
                             , "Amount must be equal to the total payable amount.");
        paidAmount +=msg.value;
        
        emit InvoicePaid(msg.value, msg.sender);

        transferMoneyToInvestor();
        transferFeeToFactor();
    }

    function getAllInvestors() public view returns (Investor[] memory){
        return investors;
    }

    function triggerPaymentOnCampaignClose() public _onlyFactor{
        transferMoneyToSeller();
    }

    function getInvoiceInfo() public view returns(InvoiceInfo memory){
        InvoiceInfo memory invoiceInfo;
        invoiceInfo.agreementHash = agreementHash;
        invoiceInfo.amountPerUnit = amountPerUnit;
        invoiceInfo.buyerName = buyerName;
        invoiceInfo.fees = fees;
        invoiceInfo.invoiceHash = invoiceHash;
        invoiceInfo.sellerName = sellerName;
        invoiceInfo.xirr = xirr;
        invoiceInfo.purchasedUnits = purchasedUnits;
        invoiceInfo.repaymentPerUnit = repaymentPerUnit;
        invoiceInfo.tenure = tenure;
        invoiceInfo.totalInvoiceAmount = totalInvoiceAmount;
        invoiceInfo.totalUnits = totalUnits;

        return invoiceInfo;

    }
 
}
