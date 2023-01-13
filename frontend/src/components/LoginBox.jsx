import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressCollected } from "../features/slices/userSlice";
import Web3 from "web3";

function LoginBox() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const currentUserAddress = useSelector((state) => state.user.userAddress);
  const dispatch = useDispatch();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
        dispatch(addressCollected(account));
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div>
      Eth Balance: {ethBalance}
      <br />
      User Address: {currentUserAddress}
      <br />
      <Button onClick={onConnect}>Login with MetaMask</Button>
    </div>
  );
}

export default LoginBox;
