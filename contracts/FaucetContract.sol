// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";


contract Faucet is Owned, Logger,IFaucet {
    //this is a special function
    //itS called when u make a tx that doesnot specify
    //funstion name to call

    //external function are part of the contract interface
    //whic means they can be called via contracts and other txs
    //address[] public funders;
    uint public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ethernet transaction"
        );
        _;
    }

    receive() external payable {}

    function emitLog() public override pure returns (bytes32) {
        return "Hello World";
    }

    // function transferOwnership(address newOwner) external onlyOwner{
    //     owner= newOwner;
    // }

    function addFunds() override external payable {
        //uint index = numOfFunders++; //number
        address funder = msg.sender;
        test3();
        if (!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function test1() external onlyOwner {
        //some managing stuff that only admin should have accessto
    }

    function test2() external {
        //some managing stuff that only admin should have accessto
    }

    function withdraw(uint withdrawAmount) override external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }

    //function jsustTesting() external pure{}
    // instance.addFunds({from: accounts[0], value: "2})

    //const instance = await Faucet.deployed();
    //instance.addFunds({from: accounts[1], value:"20000000"})
    //instance.addFunds({from: accounts[0], value:"20000000"})

    //instance.withdraw("500000000000000000", {from:accounts[1]})
    //instance.getFunderAtIndex(0)
    //instance.getAllFunders()
    //instance.emitLog()
}
