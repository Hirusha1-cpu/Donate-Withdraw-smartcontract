// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    address public owner = msg.sender;
    uint public last_completed_migration;

    modifier restricted(){
        require(
            msg.sender == owner,
            "Only the owner can call this modifier"
        );
        _;
    }

    function setCompleted(uint _completed) public restricted {
        last_completed_migration = _completed;
}
}