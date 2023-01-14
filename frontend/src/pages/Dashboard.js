import { Box, Typography } from "@mui/material";
import Header from "../components/header/Header";
import SearchBox from "../components/dashboard/SearchBox";
import TradeBar from "../components/stock/TradeBar";
import TransactionButton from "../components/transaction/TransactionButton";
import CreditsFooter from "../components/credits/CreditsFooter";
import { ToastContainer } from "react-toastify" 

export default function Dashboard() {
  return (
    <>
    <Header />
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
