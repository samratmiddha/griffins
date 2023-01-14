// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwnerWithProposal.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwner.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ChainlinkClient.sol";


// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract FetchFromArray is ChainlinkClient, ConfirmedOwner{
    using Chainlink for Chainlink.Request;
    // string public costPrice;
    bytes32 private jobId;
    uint256 private fee;

    event RequestFirstId(bytes32 indexed requestId, string costPrice);
    constructor() ConfirmedOwner(msg.sender) {
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
        req.add("path","Time Series (5min),2023-01-13 16:30:00,5. volume");
        int256 timesAmount = 10 ** 18;
        req.addInt("times", timesAmount);

        return sendChainlinkRequest(req, fee);

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

uint public costData;
function fulfill(bytes32 _requestId, uint _costData) public recordChainlinkFulfillment(_requestId) {
  costData = _costData;

}
}
