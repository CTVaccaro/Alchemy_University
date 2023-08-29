//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract ModifyVariable {
    string public data;

    constructor(string memory _data) {
        data = _data;
    }

    function modifyToLeet() public {
        data = "Leet";
    }
}