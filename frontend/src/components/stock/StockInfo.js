import { Box, Card, Typography, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { StockChart } from "./StockChart";
import getStockInfo from "../../features/requests/getStockInfo";
import getStockPrice from "../../features/requests/getStockPrice.js";
import { useDispatch } from "react-redux";

export default function StockInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [stockInfo, setStockInfo] = useState();
  const [chartOption, setChartOption] = useState("1M");
  const [stockDataset, setStockDataset] = useState([]);
  const [stockPrice, setStockPrice] = useState();
  useEffect(() => {
    getStockInfo(symbol, setStockInfo, true, dispatch);
    getStockPrice(symbol, setStockPrice, true, dispatch);
  }, [symbol]);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        maxWidth: "100%",
        alignSelf: "center",
        backgroundColor: "#27292F",
        padding: "20px",
        borderRadius: "10px",
        height: `80%`,
        overflow: `auto`,
        flexGrow: `5`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography variant="h4" sx={{ color: "white" }}>
            {stockInfo ? stockInfo.bestMatches[0]["2. name"] : <></>}
          </Typography>
          <Typography
            sx={{ marginLeft: "1rem", alignSelf: "flex-end", color: "grey" }}
          >
            {symbol}
          </Typography>
        </Box>
      </Box>
      <hr></hr>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h2" sx={{ color: "#F3EF52" }}>
            {console.log(stockPrice)}
            {stockPrice && stockPrice["4. close"]}
          </Typography>
          <Typography
            variant="h6"
            sx={{ alignSelf: "center", marginLeft: "1rem", color: "grey" }}
          >
            {stockInfo && stockInfo.bestMatches[0]["8. currency"]}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignContent: "center" }}>
          <Button
            onClick={() => {
              setChartOption("1D");
            }}
            sx={{ color: "#F3EF52" }}
          >
            1D
          </Button>
          <Button
            onClick={() => {
              setChartOption("1W");
            }}
            sx={{ color: "#F3EF52" }}
          >
            1W
          </Button>
          <Button
            onClick={() => {
              setChartOption("1M");
            }}
            sx={{ color: "#F3EF52" }}
          >
            1M
          </Button>
          <Button
            onClick={() => {
              setChartOption("3M");
            }}
            sx={{ color: "#F3EF52" }}
          >
            3M
          </Button>
          <Button
            onClick={() => {
              setChartOption("1Y");
            }}
            sx={{ color: "#F3EF52" }}
          >
            1Y
          </Button>
          <Button
            onClick={() => {
              setChartOption("3Y");
            }}
            sx={{ color: "#F3EF52" }}
          >
            3Y
          </Button>
        </Box>
      </Box>
      <Box>
        {stockDataset && (
          <StockChart
            chartData={stockDataset}
            chartOption={chartOption}
            setChartOption={setChartOption}
            setStockDataset={setStockDataset}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <Box
          sx={{
            textAlign: "center",
            margin: "2rem",
            width: "8rem",
            height: "4rem",
            backgroundColor: "#27292F",
          }}
        >
          <Typography sx={{ color: "#F3EF52" }}>Open</Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            {stockPrice && stockPrice["1. open"]}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            margin: "2rem",
            width: "8rem",
            height: "4rem",
            backgroundColor: "#27292F",
          }}
        >
          <Typography sx={{ color: "#F3EF52" }}>High</Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            {stockPrice && stockPrice["2. high"]}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            margin: "2rem",
            width: "8rem",
            height: "4rem",
            backgroundColor: "#27292F",
          }}
        >
          <Typography sx={{ color: "#F3EF52" }}>Low</Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            {stockPrice && stockPrice["3. low"]}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            margin: "2rem",
            width: "8rem",
            height: "4rem",
            backgroundColor: "#27292F",
          }}
        >
          <Typography sx={{ color: "#F3EF52" }}>Close</Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            {stockPrice && stockPrice["4. close"]}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            margin: "2rem",
            width: "8rem",
            height: "4rem",
            backgroundColor: "#27292F",
          }}
        >
          <Typography sx={{ color: "#F3EF52" }}>Volume</Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            {stockPrice && stockPrice["5. volume"]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
