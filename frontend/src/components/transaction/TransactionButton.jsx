import { Button } from "@mui/material";
import { ethers } from "ethers";
import oracleContractABI from "./oracleContractABI.json";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import emitSuccessToast from "../../utilities/emitSuccessToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validate from "../../ipfs/validate";
import checkBuffer from "../../ipfs/checkBuffer";

function TransactionButton(props) {
  let { selectedAmount, symbol, selectedUnits } = props;

  const currentUserAddress = useSelector((state) => state.user.userAddress);

  const sendTransaction = async () => {
    if (!currentUserAddress) {
      alert("No user address found. Try logging in again!");
      return;
    }

    // let params = [
    //   {
    //     from: currentUserAddress,
    //     // to: "0x1EF3A9077ba56c91d49837615E669455a5377629",
    //     to: "0x23c1dFbbEBf49732f4C2A5b9E494062c1ff918de",
    //     value: ethToWeiHex(0.001),
    //   },
    // ];

    // const transaction = await window.ethereum
    //   .request({
    //     method: "eth_sendTransaction",
    //     params,
    //   })
    //   .catch((_error) => {
    //     emitWarnToast("Transaction cancelled.");
    //   });

    // if (transaction) {
    //   emitSuccessToast("Transaction initiated.");
    // }
    const contractAddr = "0xD00Af6fe8e9887032dC160e687dc6Cfe270cBA0e";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddr,
      oracleContractABI,
      signer
    );
    // contract.validateTransaction(selectedAmount,symbol,selectedUnits).send({from:currentUserAddress, value: selectedAmount})
    let weiAmount = String(Number(selectedAmount) * 10 ** 18);

    console.log(currentUserAddress);
    let isValid = validate(currentUserAddress);
    if (isValid) {
      let valid = await contract.validateTransaction(symbol, selectedUnits, {
        value: weiAmount,
      });
      contract.on("StatusEvent", (status) => {
        checkBuffer(symbol, selectedUnits, "asds", currentUserAddress);
        emitSuccessToast(`Transaction Completed. Transaction id ${valid.hash}`);
        console.log(status);
      });
    } else {
      console.log("some error");
    }

    /* 
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
        const isValid = validate(currentUserAddress);

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
            checkBuffer(symbol, quantity, transaction, currentUserAddress);
          }
        }
      } else {
        console.log(status);
      }
    }); */
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
