// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
// import "./oracleContract.sol";
contract Trade{
    event PaymentStatus(string indexed status );
    event Status(string indexed status);

    struct balanceData{
        uint256 balance ;
    }
    mapping (
        address => balanceData
    )accounts;
    address[] public users;
    function updateAccounts (address user , uint256 addBalance)  internal {
        account = accounts[user];

    }
    fallback() external payable{
        emit Status("successful");
    }
    receive() external payable{
        // emit PaymentStatus();
        updateAccounts(msg.sender,msg.value-msg.gas);
        
    }
    address constant public myAddress = 0xA0033a073D939c94ff5711161EB56cE1f43EaBA9;

    address payable public addr;
    string public companyName;
    string public stockQuantity;
    
    constructor(){

    }

   

    function fetchStockPrice() pure internal returns(uint){
        
        return 0.001 ether;
    }
    function buy(string memory _companyName , string memory _stockQuantity ) payable public {
        addr = payable(msg.sender);
        companyName = _companyName;
        stockQuantity = _stockQuantity;
        uint256 etherRequired=fetchStockPrice();
        if(etherRequired < msg.value){
            emit Status("Transaction Failed");
            revert("Transaction Failed due to Insufficient Balance");
        }
        
        payable(myAddress).transfer(0.01 ether);
        emit Status("Transaction Successfull");
    }

    function sell ( string memory _companyName , string memory _stockQuantity) payable public{
        addr=payable(msg.sender);
        companyName = _companyName;
        stockQuantity = _stockQuantity;
        emit Status("Successfull");
    }
}