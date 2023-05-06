// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Storage {
    mapping(uint => uint) public values;//slot 0
    mapping(address => uint) public values1;//slot 0
    //keccak256(key . slot)

    uint8 public a = 7;
    uint16 public b = 7;
    address public c = address(0x12345678901234567890123456789012345);
    bool d = true;
    uint64 public e = 7;

    uint[] public cc;

    uint public f = 200;

    constructor(){

        cc.push(1);
        values[2] = 4;
        values[3] = 14;

        values1[0xFaDc6FCf5d78E92B72015a01fe4bC9aA6b38aA16] = 100;

    }


}

// 0x0000000000000000000000000000000000000000000000000000000000000000
// 0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000