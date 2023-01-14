import { Box, Card, Typography, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { StockChart } from "./StockChart";

export default function StockInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [stockInfo, setStockInfo] = useState();
  const [chartOption, setChartOption] = useState("1W");
  const [stockDataset, setStockDataset] = useState([]);
  const [stockPrice, setStockPrice] = useState();
  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${nanoid()}`
      )
      .then((res) => {
        console.log("response", res);
        console.log(res.data, "data");
        setStockInfo(res.data);
        return res.data;
      });
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${nanoid()}`
      )
      .then((res) => {
        var key = Object.keys(res.data["Time Series (5min)"])[0];
        setStockPrice(res.data["Time Series (5min)"][key]);
      });
  }, [symbol]);

  return (
    <Box
      sx={{
        width: "60vw",
        marginLeft: "2vw",
        alignSelf: "center",
        backgroundColor: "#27292F",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography variant="h4" sx={{ color: "white" }}>
            {stockInfo && stockInfo.bestMatches[0]["2. name"]}
          </Typography>
          <Typography
            sx={{ marginLeft: "1rem", alignSelf: "flex-end", color: "grey" }}
          >
            {stockInfo && symbol}
          </Typography>
        </Box>
      </Box>
      <hr></hr>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
