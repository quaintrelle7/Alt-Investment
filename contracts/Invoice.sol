// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract InvoiceFinal{


    address public seller;
    string public invoiceHash;
    string public agreementHash;
    address[] public investors;
    address public factor;
    address public payer;
    uint256 public fees;
    uint256 public amount;
    uint256 public discountedAmount;
    uint256 private totalInvestedAmount = 0;
    uint256 private paidAmount;
    enum Status { PROCESSING, APPROVED, DECLINED, PURCHASED, COMPLETED}
    Status status;

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
        string memory _ipfsHash
    ){
        seller = msg.sender;
        invoiceHash = _ipfsHash;
    }


    function approveInvoice(uint256 _amount, uint256 _discountedAmount, string memory _agreementHash, uint256 _fees)_onlyFactor external{
        // require(factor == msg.sender, "Only factor can approve invoice");
        assert(_discountedAmount<_amount);
        assert(fees<_amount);

        factor = msg.sender;
        amount = _amount *(10**18);
        discountedAmount = _discountedAmount *(10**18);
        agreementHash = _agreementHash;
        fees = _fees * (10**18);
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
        require(totalInvestedAmount == discountedAmount, "Invested amount does not match invoice amount");
        // payable(seller).transfer(address(this).balance);
        (bool success, ) = payable(seller).call{value: address(this).balance}("");
        require(success, "Transfer to seller failed");
        totalInvestedAmount = 0;
        emit MoneyTransferToSeller(seller, address(this).balance);
    }


    //considering only one investor for now
    function purchaseInvoice() payable external _invoiceApproved{
        require(discountedAmount==msg.value, "Invested amount does not match invoice amount.");
        investors.push(msg.sender);
        // investedAmount = _investedAmount;
        totalInvestedAmount += msg.value;
        status = Status.PURCHASED;
        emit InvoicePurchased(msg.sender);

        transferMoneyToSeller();
        
    }

     function  transferFeeToFactor() internal _invoiceApproved{
        (bool success, ) = payable(factor).call{value: address(this).balance}("");
        require(success, "Transfer to factor failed");
        status= Status.COMPLETED;
        emit FeesTransferToFactor(factor, address(this).balance);
        
    }

    function transferMoneyToInvestor() internal _invoiceApproved{
        (bool success, ) = payable(investors[0]).call{value: paidAmount-fees}("");
        require(success, "Transfer to investor failed");
        emit MoneyTransferToInvestor(investors[0], paidAmount-fees);
    }

    function payInvoiceAmount() payable external _invoiceApproved{
       require(msg.value == amount , "Paid amount must be equal to the invoice amount");
        paidAmount +=msg.value;
        payer = msg.sender;
        emit InvoicePaid(msg.value, msg.sender);

        transferMoneyToInvestor();
        transferFeeToFactor();
    }
 
}
