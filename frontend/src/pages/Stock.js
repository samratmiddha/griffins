import StockInfo from "../components/stock/StockInfo";
import { Box } from "@mui/material";
import TradeBar from "../components/stock/TradeBar";
import { ToastContainer } from "react-toastify";
import Header from "../components/header/Header";
import CreditsFooter from "../components/credits/CreditsFooter";

export default function Stock() {
  return (
    <>
    <Header />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#141518",
        flexWrap: "wrap",
        flexDirection: `row`,
        paddingTop: `10px`,
        gap: `20px`,
        minHeight: `100vh`,
      }}
    >
      <Box>
      <StockInfo />
      </Box>
      <Box sx={{
        display: `flex`,
        justifyContent: `center`,
      }}>
      <TradeBar />
      </Box>
      <ToastContainer />
    </Box>
    <CreditsFooter />
    </>
  );
}
