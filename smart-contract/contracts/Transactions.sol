//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCounter;

    event Transfer(address sender, address receiver, uint amount, string message, uint256 timestamp);

    struct transferStructure{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    transferStructure[] transactions;

    function addBlock(address receiver, uint amount, string memory message) public {
        transactionCounter+=1;
        transactions.push(transferStructure(msg.sender, receiver, amount, message, block.timestamp));
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function getTransactions() public view returns (transferStructure[] memory) {
        return transactions;
    }

    function transactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}