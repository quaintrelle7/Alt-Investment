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
    string public status = "PROCESSING";
    uint256 public totalInvestedAmount = 0;
    uint256 public paidAmount;

    modifier _onlySeller{
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
        require(agreementSigned);
        _;
    }

    constructor(
        string memory _ipfsHash
    ){
        seller = msg.sender;
        invoiceHash = _ipfsHash;
    }

    function approveInvoice(uint256 _amount, uint256 _discountedAmount, string memory _agreementHash, uint256 _fees)_onlyFactor external{
        // require(factor == msg.sender, "Only factor can approve invoice");
        factor = msg.sender;
        amount = _amount *(10**18);
        discountedAmount = _discountedAmount *(10**18);
        agreementHash = _agreementHash;
        fees = _fees * (10**18);
    }

    function declineInvoice() external{
        status="DECLINED";
    }

    function signAgreement() external {

        //Think on how to get it signed by Payer and Seller
        status = "APPROVED";
        agreementSigned = true;
    }

    function purchaseInvoice() payable external _invoiceApproved{
        investors.push(msg.sender);
        // investedAmount = _investedAmount;
        totalInvestedAmount += msg.value;
        status="PURCHASED";
    }

    function transferMoneyToSeller() payable external _invoiceApproved{
        require(totalInvestedAmount == discountedAmount, "Invested amount does not match invoice amount");
        payable(seller).transfer(address(this).balance);
        totalInvestedAmount = 0;
    }

    function payInvoiceAmount() payable external _invoiceApproved{
       require(msg.value == amount , "Paid amount must be equal to the invoice amount");
        paidAmount +=msg.value;
        payer = msg.sender;
        emit InvoicePaid(msg.value, msg.sender);
        payable(investors[0]).transfer((paidAmount-fees));
        status="PAID";
    }

   
    function  transferFeeToFactor() payable external _invoiceApproved{
        payable(factor).transfer(address(this).balance);
        status="COMPLETED";
    }

    event InvoicePaid(uint256 amountPaid, address payer);

}