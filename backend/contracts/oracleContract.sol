// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwner.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ChainlinkClient.sol";


// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract FetchFromArray is ChainlinkClient, ConfirmedOwner{
    using Chainlink for Chainlink.Request;
    string public costPrice;
    bytes32 private jobId;
    uint256 private fee;

    event RequestFirstId(bytes32 indexed requestId, string costPrice);
    constructor(){
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }
     function requestFirstId() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=vxvcxv"
        );
        req.add("path","data");
        int256 timesAmount = 10 ** 18;
        req.addInt("times", timesAmount);

        return sendChainlinkRequest(req, fee);

    }

string public costData;
function fulfill(bytes32 _requestId, string memory _costData) public recordChainlinkFulfillment(_requestId) {
  costData = _costData;

}
}