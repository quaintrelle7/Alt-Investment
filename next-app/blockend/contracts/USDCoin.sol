// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "C:/Next/Alt-Investment/Alt-Investment/next-app/node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract USDCoin is ERC20, Ownable {
    constructor(uint256 initialSupply, address initialOwner) ERC20("USD Coin", "USDC") Ownable(initialOwner) {
        _mint( initialOwner, initialSupply * 10**decimals());
    }

    // USDC uses 6 decimal places
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
