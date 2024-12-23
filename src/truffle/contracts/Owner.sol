// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18; 


contract Owner {
    address public owner;
    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "you are not the owner");
        _;
    }

    function isOwner() public view returns(bool) {
        require(owner == msg.sender, "you are not the owner");
        return true;
    }
}