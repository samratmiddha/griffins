import StockInfo from "../components/stock/StockInfo";
import { Box } from "@mui/material";
import TradeBar from "../components/stock/TradeBar";
import { ToastContainer } from "react-toastify";

export default function Stock() {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        backgroundColor: "#141518",
        flexWrap: "wrap",
        height: "100vh",
      }}
    >
      <StockInfo></StockInfo>
      <TradeBar />
      <ToastContainer />
    </Box>
  );
}
