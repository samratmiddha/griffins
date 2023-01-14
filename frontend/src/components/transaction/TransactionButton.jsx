import { Button } from "@mui/material";
import { ethers } from "ethers";
import oracleContractABI from "./oracleContractABI.json";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import emitSuccessToast from "../../utilities/emitSuccessToast";
import emitWarnToast from "../../utilities/emitWarnToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validate from "../../ipfs/validate";
import checkBuffer from "../../ipfs/checkBuffer";

function TransactionButton() {
  const currentUserAddress = useSelector((state) => state.user.userAddress);
  let value = 0.001;
  let symbol = "";
  let quantity = "";

  const ethToWeiHex = (eth) => {
    const wei = eth * 10 ** 18;
    return wei.toString(16);
  };

  const sendTransaction = async () => {
    if (!currentUserAddress) {
      alert("No user address found. Try logging in again!");
      return;
    }
    console.log(currentUserAddress);
    const contractAddr = "0x23c1dFbbEBf49732f4C2A5b9E494062c1ff918de";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddr,
      oracleContractABI,
      provider
    );

    contract.on("RequestFirstId", async (requestID, status) => {
      if (status) {
        const isValid = validate();

        if (isValid) {
          let params = [
            {
              from: currentUserAddress,
              // to: "0x1EF3A9077ba56c91d49837615E669455a5377629",
              to: contractAddr,
              value: ethToWeiHex(value),
            },
          ];

          const transaction = await window.ethereum
            .request({
              method: "eth_sendTransaction",
              params,
            })
            .catch((_error) => {
              emitWarnToast("Transaction cancelled.");
            });

          if (transaction) {
            emitSuccessToast("Transaction initiated.");
            checkBuffer(symbol, quantity, transaction);
          }
        }
      } else {
        console.log(status);
      }
    });
  };

  const getTransactions = async () => {
    emitSuccessToast("Initiated transaction process");

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
      {/* <Button onClick={sendTransaction}>Create Transaction of 0.001 eth</Button> */}
      <Button
        onClick={sendTransaction}
        variant="contained"
        sx={{
          borderRadius: `20px`,
          width: `20rem`,
          height: `3rem`,
          backgroundColor: `black`,
          color: `white`,
          "&:hover": {
            backgroundColor: "black",
            borderColor: "black",
            color: `white`,
          },
        }}
      >
        Continue
      </Button>
      {/* <Button onClick={getTransactions}>Get Transactions</Button> */}
      <ToastContainer />
    </>
  );
}

export default TransactionButton;
