// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract InvoiceFactory{
    address[] public deployedInvoices;

    function createID(string calldata ipfsHash) public{

        address newID = address(new Invoice(ipfsHash, msg.sender));
        deployedInvoices.push(newID);

    }

    function getDeployedContracts() public view returns(address[] memory){
        return deployedInvoices;
    }
}


contract Invoice{


    address public seller;
    string public invoiceHash;
    string public agreementHash;
    address public factor;
    address public recourse_payer;

    uint256 public totalInvoiceAmount;
    uint256 public fees;
    uint256 public amountPerUnit;
    uint256 public repaymentPerUnit;
    uint256 public totalUnits;
    uint256 public purchasedUnits = 0;

    uint256 private expected_repayment_date;
    uint256 private expected_payout_date;

    uint256 private totalInvestedAmount = 0;
    uint256 private paidAmount;

    enum Status { PROCESSING, APPROVED, DECLINED, PURCHASED, COMPLETED}
    Status status;
    
    struct Investor{
        address investor_address;
        uint256 invested_amount;
        uint256 repayment_amount;
        uint256 total_units;
    }

        Investor[] public investors;


    modifier _onlySeller{
        require(msg.sender==seller, "Agreement should be signed by invoice seller.");
        _;
    }

    modifier _onlyFactor{
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
        address _seller
    ){
        seller = _seller;
        recourse_payer = seller;
        invoiceHash = _ipfsHash;
    }


    function approveInvoice(
        uint256 _totalInvoiceAmount, 
        uint256 _amountPerunit, 
        uint256 _repaymentPerUnit, 
        uint256 _totalUnits,
        string memory _agreementHash, 
        uint256 _fees)  _onlyFactor external{
        
        // require(factor == msg.sender, "Only factor can approve invoice");
        assert(fees<_totalInvoiceAmount);

        factor = msg.sender;
        totalInvoiceAmount = _totalInvoiceAmount *(10**9);
        agreementHash = _agreementHash;
        fees = _fees * (10**9);
        amountPerUnit = _amountPerunit * (10**9);
        repaymentPerUnit = _repaymentPerUnit * (10**9);
        totalUnits = _totalUnits;
        status = Status.APPROVED;
        emit InvoiceApproved(factor); 
    }


    function declineInvoice() external{
        agreementSigned = false;
        status=Status.DECLINED;
    }


    function signAgreement() external _onlySeller {
        //Think on how to get it signed by Payer and Seller
        //Request should go to seller's and payer's dashboard to sign - but apart from that
        //It should be signed just by the seller - perhaps. Confirm on this with AB
        require(status == Status.APPROVED, "Aggrement is not approved by factor.");
        agreementSigned = true;
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
        } 
    }

     function  transferFeeToFactor() internal _invoiceApproved{
        (bool success, ) = payable(factor).call{value: address(this).balance}("");
        require(success, "Transfer to factor failed");
        status= Status.COMPLETED;
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

    function payInvoiceAmount() payable external _invoiceApproved{
       require(msg.value == ((totalUnits * repaymentPerUnit) + fees)
                             , "Amount must be equal to the repay amount");
        paidAmount +=msg.value;
        
        emit InvoicePaid(msg.value, msg.sender);

        transferMoneyToInvestor();
        transferFeeToFactor();
    }
 
}
