// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwnerWithProposal.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwner.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ChainlinkClient.sol";


// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract FetchFromArray is ChainlinkClient, ConfirmedOwner{
    using Chainlink for Chainlink.Request;

    uint public stockPrice;
    uint public selectedAmount;
    uint public convertedCurrency;
    string public stockCurrency;
    bytes32 private jobId;
    uint256 private fee;

    event StatusEvent(bool status);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function validateTransaction(string memory symbol,uint selectedUnits) public payable
    {
        selectedAmount=msg.value;
        this.getStockCurrency(symbol);
        this.getStockPrice(symbol);
        this.convertCurrency();

        // if(selectedAmount<selectedUnits*stockPrice*convertedCurrency)
        //     emit StatusEvent(false);
        // else
        //     emit StatusEvent(true);
        require(selectedAmount>=selectedUnits*stockPrice*convertedCurrency,'Error');
        emit StatusEvent(true);
    }

    function getStockPrice(string memory symbol) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillStockPrice.selector
        );
        string memory url=string.concat("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=",symbol,"&interval=5min&apikey=vxvcxv");
        req.add("get",url);
        req.add("path","Time Series (5min),2023-01-13 16:30:00,4. close");
        int256 timesAmount = 10 ** 9;
        req.addInt("times", timesAmount);
        return sendChainlinkRequest(req, fee);

    }
    function fulfillStockPrice(bytes32 _requestId, uint _stockPrice) public recordChainlinkFulfillment(_requestId) {
        stockPrice=_stockPrice;
    }


    function getStockCurrency(string memory symbol) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillStockCurrency.selector
        );
        string memory url=string.concat("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=",symbol,"&apikey=vxvcxv");
        req.add("get",url);
        req.add("path","bestMatches,0,8. currency");
        return sendChainlinkRequest(req, fee);
    }
    function fulfillStockCurrency(bytes32 _requestId, string memory _stockCurrency) public recordChainlinkFulfillment(_requestId) {
        stockCurrency=_stockCurrency;
    }


    function convertCurrency() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillCurrencyConverter.selector
        );
        string memory url=string.concat("https://min-api.cryptocompare.com/data/price?fsym=",stockCurrency,"&tsyms=ETH&api_key=db0586d77050155a01def6221e02c966e9d11981d2addd971d8ae21a85729e9a");
        req.add("get",url);
        req.add("path","ETH");
        int256 timesAmount = 10 ** 9;
        req.addInt("times", timesAmount);
        return sendChainlinkRequest(req, fee);
    }
    function fulfillCurrencyConverter(bytes32 _requestId, uint _convertedCurrency) public recordChainlinkFulfillment(_requestId) {
        convertedCurrency=_convertedCurrency;
    }
}





    // function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
    //     uint8 i = 0;
    //     while(i < 32 && _bytes32[i] != 0) {
    //         i++;
    //     }
    //     bytes memory bytesArray = new bytes(i);
    //     for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
    //         bytesArray[i] = _bytes32[i];
    //     }
    //     return string(bytesArray);
    // }
