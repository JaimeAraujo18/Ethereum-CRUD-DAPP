// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Persons {
    string public name;
    address public owner = msg.sender;
    uint public last_completed_migration;

    // function Persons() public {
    constructor() public {
        name = "Joaquina da silva";
    }

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}
