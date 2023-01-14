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
        height: "100vh",
        backgroundColor: "#141518",
        flexWrap: "wrap",
      }}
    >
      <StockInfo></StockInfo>
      <TradeBar />
      <ToastContainer />
    </Box>
  );
}
