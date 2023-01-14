import { Box, Button, Typography } from "@mui/material";
import Header from "../components/header/Header";
import SearchBox from "../components/dashboard/SearchBox";
import TradeBar from "../components/stock/TradeBar";
import TransactionButton from "../components/transaction/TransactionButton";
import CreditsFooter from "../components/credits/CreditsFooter";
import { ToastContainer } from "react-toastify" 
import ipfsSaveFile from "../ipfs/ipfsStore";
import validate from "../ipfs/validate";

export default function Dashboard() {
  const call = async () => {
    validate();
  }

  return (
    <>
    <Header />
    <Button onClick = {call}>Click me</Button>
    <Box
      sx={{
        backgroundColor: "#141518",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        paddingTop: `100px`,
      }}
    >
      {/* <Typography
        variant="h1"
        sx={{ color: "#F3EF52", marginBottom: "2rem" }}
        align="center"
      >
        Webster
      </Typography> */}
      <SearchBox />
    </Box>
    <ToastContainer />
    <CreditsFooter />
    </>
  );
}
