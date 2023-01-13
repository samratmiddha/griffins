// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ChainlinkClient.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwner.sol";

// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract APIconsumer is ChainlinkClient, ConfirmedOwner{
    using Chainlink for Chainlink.Request;
    constructor(){

    }
    function makeReq() public{
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        );
        req.add("path","data");
        int256 timesAmount = 10 ** 18;
        req.addInt("times", timesAmount);

        return sendChainlinkRequest(req, fee);

    }
}