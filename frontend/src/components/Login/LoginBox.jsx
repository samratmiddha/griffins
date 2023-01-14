import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressCollected } from "../../features/slices/userSlice";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

function LoginBox() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const currentUserAddress = useSelector((state) => state.user.userAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log(
        "Non-ethereum browser detected. You should install Metamask Browser."
      );
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
        navigate("");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#141518",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ alignSelf: "center" }}>
        <Typography variant="h1" sx={{ color: "#F3EF52" }} align="center">
          Webster
        </Typography>
        <Button
          onClick={onConnect}
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "2rem",
            border: "2px solid white",
            marginTop: "4rem",
          }}
        >
          Login with MetaMask
        </Button>
      </Box>
    </div>
  );
}

export default LoginBox;
