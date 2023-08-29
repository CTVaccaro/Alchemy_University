//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Leone is ERC20 {

    uint256 _initial_supply = 100 * (10**18);
    address owner;

    constructor() ERC20("LEONE", "LEO2") {
        _mint(msg.sender, _initial_supply);
        owner = msg.sender;
    }
}