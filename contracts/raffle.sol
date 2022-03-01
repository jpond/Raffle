// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Raffle {

    bool private open;

    address payable public owner;
    uint public buyValue;
    uint public ids;
    string public ipfsHash;

    mapping(uint => address payable) people;
    uint[] amount;

    constructor(uint BV){
        buyValue = BV;
        open = true;
        owner = payable(msg.sender);
        ids = 1;
    }

    function buyIn() public payable{
        require(open == true && msg.value >= buyValue);
        people[ids] = payable(msg.sender);
        amount[ids] = msg.value;
        ids++;
    }

    function returnFunds() public {
        require(msg.sender == owner);
        for(uint i = 1; i <= ids; i++){
            people[i].transfer(amount[i]);
        }
    }

    function finish() public {
        require(msg.sender == owner);
        open = false;
        owner.transfer(address(this).balance);
    }

}