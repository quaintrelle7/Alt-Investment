// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/utils/Pausable.sol";
import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract InvoiceFactory is AccessControl {

    bytes32 public constant FACTOR_ROLE = keccak256("FACTOR_ROLE");
    address[] public deployedInvoices;
    mapping(address => bool) public activeInvoices;
    address public immutable admin;

    // Fixed USDC token address (Ethereum mainnet)
    address public constant USDC_ADDRESS = 0x2295B8D2b756163cFe8C6C9151be898E6109Eaa8;

    event InvoiceCreated(address invoiceAddress, string ipfsHash);
    event FactorAdded(address factor);
    event FactorRemoved(address factor);

    constructor() {
        admin = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(FACTOR_ROLE, msg.sender);
    }

    function createInvoice(string calldata ipfsHash) public returns (address) {
        address newInvoice = address(new Invoice(ipfsHash, msg.sender, address(this)));
        deployedInvoices.push(newInvoice);
        Invoice(newInvoice).setFactor(admin);
        activeInvoices[newInvoice] = true;
        emit InvoiceCreated(newInvoice, ipfsHash);
        return newInvoice;
    }

    function addFactor(address _factor) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(FACTOR_ROLE, _factor);
        emit FactorAdded(_factor);
    }


    function removeFactor(address _factor) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(FACTOR_ROLE, _factor);
        emit FactorRemoved(_factor);
    }

    function getDeployedInvoices() public view returns (address[] memory) {
        return deployedInvoices;
    }

    function markInvoiceInactive(address invoiceAddress) external {
        require(activeInvoices[invoiceAddress], "Invoice not active");
        require(Invoice(invoiceAddress).isCompleted(), "Invoice not completed");
        activeInvoices[invoiceAddress] = false;
    }

    function addInvoiceFactor(address invoiceAddress, address newFactor) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(activeInvoices[invoiceAddress], "Invoice not active");
        Invoice(invoiceAddress).setFactor(newFactor);
    }

    mapping(address => address[]) public investorInvoices; // Mapping of investor address to an array of invoice addresses.

    function addInvestorInvoice(address investor, address invoiceAddress) external {
        require(activeInvoices[invoiceAddress], "Invoice is not active");
        investorInvoices[investor].push(invoiceAddress); // Add the invoice to the investor's list
    }

    // Function to get all invoices an investor has participated in
    function getInvestorInvoices(address investor) public view returns (address[] memory) {
        return investorInvoices[investor]; // Return the array of invoice addresses
    }

}

contract Invoice is ReentrancyGuard, AccessControl, Pausable {

    bytes32 public constant FACTOR_ROLE = keccak256("FACTOR_ROLE");
    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");

    using SafeERC20 for IERC20;


    IERC20 public immutable usdcToken;
    address public immutable factoryAddress;
    address public immutable seller;


    string public invoiceHash;
    string public agreementHash;
    uint256 public totalInvoiceAmount;
    uint256 public fees;
    uint256 public amountPerUnit;
    uint256 public repaymentPerUnit;
    uint256 public totalUnits;
    uint256 public purchasedUnits;
    uint256 public tenure;
    uint256 public expectedRepaymentDate;
    uint256 public expectedPayoutDate;
    bool public isCompleted;

    struct Investor {
        uint256 investedAmount;
        uint256 repaymentAmount;
        uint256 totalUnits;
        bool hasClaimed;
    }

    mapping(address => Investor) public investors;
    address[] public investorList;

    event InvoiceApproved(address factor, uint256 totalAmount, uint256 totalUnits);
    event InvoicePurchased(address investor, uint256 units, uint256 amount);
    event InvoicePaid(address payer, uint256 amount);
    event FundsTransferredToSeller(address seller, uint256 amount);
    event InvestorRepaid(address investor, uint256 amount);
    event FeesTransferredToFactor(address factor, uint256 amount);

    constructor(string memory _ipfsHash, address _seller, address _factoryAddress) {
        require(_seller != address(0), "Seller address cannot be zero");
        require(_factoryAddress != address(0), "Factory address cannot be zero");
        

        // require(usdcToken != address(0), "USDC token address cannot be zero");

    
        invoiceHash = _ipfsHash;
        factoryAddress = _factoryAddress;
        usdcToken = IERC20(InvoiceFactory(factoryAddress).USDC_ADDRESS());
        seller = _seller;

        //It should get only seller role

        _grantRole(DEFAULT_ADMIN_ROLE, _factoryAddress);
        _grantRole(SELLER_ROLE, _seller);
        _setRoleAdmin(FACTOR_ROLE, DEFAULT_ADMIN_ROLE);
    }

    function setFactor(address _factor) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(FACTOR_ROLE, _factor);
    }



    function approveInvoice(
        uint256 _totalInvoiceAmount,
        uint256 _amountPerUnit,
        uint256 _repaymentPerUnit,
        uint256 _totalUnits,
        uint256 _tenure,
        string memory _agreementHash,
        uint256 _fees
    ) external onlyRole(FACTOR_ROLE) whenNotPaused {
        require(_fees < _totalInvoiceAmount, "Fees cannot be greater than total invoice amount");
        require(_totalInvoiceAmount == _amountPerUnit*(_totalUnits), "Invalid total amount");
        require(_repaymentPerUnit > _amountPerUnit, "Repayment per unit must be greater than amount per unit");

        totalInvoiceAmount = _totalInvoiceAmount* 10**6;
        agreementHash = _agreementHash;
        fees = _fees * 10**6;
        amountPerUnit = _amountPerUnit * 10**6;
        repaymentPerUnit = _repaymentPerUnit * 10**6;
        totalUnits = _totalUnits;
        tenure = _tenure;
        expectedRepaymentDate = block.timestamp + (tenure * (86400));       
        // expectedPayoutDate = block.timestamp.add(1 days); // Assuming 1 day for payout after full investment

        emit InvoiceApproved(msg.sender, totalInvoiceAmount, totalUnits);
    }


    function purchaseInvoice(uint256 _units) external nonReentrant whenNotPaused {
        require(_units > 0 && _units <= (totalUnits - purchasedUnits), "Invalid units");
        uint256 purchaseAmount = _units * amountPerUnit;
        
        require(usdcToken.balanceOf(msg.sender) >= purchaseAmount, "Insufficient USDC balance");
        require(usdcToken.allowance(msg.sender, address(this)) >= purchaseAmount, "Insufficient allowance");

        // Update state before external calls
        purchasedUnits += _units;
        Investor storage investor = investors[msg.sender];
        if (investor.investedAmount == 0) {
            investorList.push(msg.sender);
        }
        investor.investedAmount += purchaseAmount;
        investor.repaymentAmount += _units * repaymentPerUnit;
        investor.totalUnits += _units;

        InvoiceFactory(factoryAddress).addInvestorInvoice(msg.sender, address(this));

        // Perform the transfer after state updates
        usdcToken.safeTransferFrom(msg.sender, address(this), purchaseAmount);

        emit InvoicePurchased(msg.sender, _units, purchaseAmount);

        if (purchasedUnits == totalUnits) {
            _transferToSeller();
        }
    }


    function payInvoice() external nonReentrant whenNotPaused {
        require(!isCompleted, "Invoice already completed");
        require(purchasedUnits == totalUnits, "Invoice not fully funded");

        uint256 totalPayable = (totalUnits * repaymentPerUnit) + fees;
        
        // Update state before external calls
        isCompleted = true;

        // Perform the transfer after state updates
        usdcToken.safeTransferFrom(msg.sender, address(this), totalPayable);

        emit InvoicePaid(msg.sender, totalPayable);
    }

    function claimRepayment() external nonReentrant whenNotPaused {
        require(isCompleted, "Invoice not completed");
        Investor storage investor = investors[msg.sender];
        require(investor.investedAmount > 0, "No investment found");
        require(!investor.hasClaimed, "Already claimed");

        uint256 repaymentAmount = investor.repaymentAmount;
        
        // Update state before external calls
        investor.hasClaimed = true;

        // Perform the transfer after state updates
        usdcToken.safeTransfer(msg.sender, repaymentAmount);

        emit InvestorRepaid(msg.sender, repaymentAmount);
    }


    function claimFees() external onlyRole(FACTOR_ROLE) nonReentrant whenNotPaused {
        require(isCompleted, "Invoice not completed");
        require(fees > 0, "No fees to claim");

        uint256 feeAmount = fees;
        
        // Update state before external calls
        fees = 0;

        // Perform the transfer after state updates
        usdcToken.safeTransfer(msg.sender, feeAmount);

        emit FeesTransferredToFactor(msg.sender, feeAmount);
    }

    function _transferToSeller() internal {
        require(seller != address(0), "Seller address not set");
        require(usdcToken.transfer(seller, totalInvoiceAmount), "Transfer to seller failed");
        emit FundsTransferredToSeller(seller, totalInvoiceAmount);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function getInvestorInfo(address _investor) external view returns (Investor memory) {
        return investors[_investor];
    }

    function getAllInvestors() external view returns (address[] memory) {
        return investorList;
    }
}