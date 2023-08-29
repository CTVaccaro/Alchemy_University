//SPDX-LICENSE-IDENTIFIER: MIT
pragma solidity ^0.8.17;

contract Faucet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }
    
    function withdraw(uint _amount) payable public {
            require(_amount <= 100000000000000000); // users can only withdraw .1 ETH at a time
            (bool sent, ) = payable(msg.sender).call{value: _amount}("");
            require(sent, "Failed to send ether");
    }
    
    function withdrawAll() onlyOwner public{
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send ether");
    }

    function destroyFaucet() onlyOwner public {
        selfdestruct(owner);
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
}