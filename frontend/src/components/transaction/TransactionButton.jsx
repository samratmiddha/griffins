import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

function TransactionButton() {
  const currentUserAddress = useSelector((state) => state.user.userAddress);

  const ethToWeiHex = (eth) => {
    const wei = eth * 10 ** 18;
    return wei.toString(16);
  };

  const sendTransaction = async () => {
    if (!currentUserAddress) {
      alert("No user address found. Try logging in again!");
      return;
    }

    let params = [
      {
        from: currentUserAddress,
        to: "0x1EF3A9077ba56c91d49837615E669455a5377629",
        value: ethToWeiHex(0.001),
      },
    ];

    const transaction = await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTransactions = async () => {
    if (!currentUserAddress) {
      alert("No user address found. Try logging in again!");
      return;
    }

    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .get(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${currentUserAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=75VZ9146GW6GY4Y5UWP84784EEQX43QBN4`,
        config
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <Button onClick={sendTransaction}>Create Transaction of 0.001 eth</Button>
      <Button onClick={getTransactions}>Get Transactions</Button>
    </>
  );
}

export default TransactionButton;
