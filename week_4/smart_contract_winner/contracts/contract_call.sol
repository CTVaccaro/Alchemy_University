//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract c_call {
    function call_winner(address winner) external {
        (bool s, ) = winner.call(abi.encodeWithSignature("attempt()"));
        require(s);
    }
}