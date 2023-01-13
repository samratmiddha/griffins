import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { StockChart } from "./StockChart";

export default function StockInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [stockInfo, setStockInfo] = useState();
  const [chartOption, setChartOption] = useState("3M");
  const [stockDataset, setStockDataset] = useState([]);
  function handleCsv(data, instances) {
    var allRows = data.split(/\r?\n|\r/);
    if (!instances) {
      instances = allRows.length();
    }
    var stockData = [];
    for (var singleRow = 1; singleRow <= instances; singleRow++) {
      var rowCells = allRows[singleRow].split(",");
      stockData.push({
        time: rowCells[0],
        high: rowCells[2],
        low: rowCells[3],
      });
    }
    console.log(stockData);
    return stockData;
  }
  function getStockData(data, instances) {
    let s_data = [];
    let keys = Object.keys(data);
    instances = Math.min(keys.length, instances);
    for (var row = 1; row <= instances; row++) {
      if (
        row > 1 &&
        data[keys[row]]["3. low"] < data[keys[row - 1]]["3. low"]
      ) {
        s_data.push({
          time: keys[row],
          high: data[keys[row]]["2. high"],
          low: data[keys[row]]["3. low"],
          trend: "D",
        });
      } else {
        s_data.push({
          time: keys[row],
          high: data[keys[row]]["2. high"],
          low: data[keys[row]]["3. low"],
          trend: "I",
        });
      }
    }
    return s_data;
  }
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
  }, [symbol]);
  useEffect(() => {
    if (chartOption === "1W") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=${nanoid()}`
        )
        .then((res) => {
          console.log("intraday-data", res.data);
          setStockDataset(handleCsv(res.data, 250));
        });
    } else if (chartOption === "1M") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=compact&apikey=${nanoid()}`
        )
        .then((res) => {
          setStockDataset(getStockData(res.data["Time Series (Daily)"], 30));
        });
    } else if (chartOption === "3M") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=compact&apikey=${nanoid()}`
        )
        .then((res) => {
          setStockDataset(getStockData(res.data["Time Series (Daily)"], 100));
        });
    } else if (chartOption === "1Y") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${nanoid()}`
        )
        .then((res) => {
          setStockDataset(getStockData(res.data["Weekly Time Series"], 52));
        });
    } else if (chartOption === "5Y") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${nanoid()}`
        )
        .then((res) => {
          setStockDataset(getStockData(res.data["Weekly Time Series"], 260));
        });
    }
  }, [chartOption]);

  return (
    <Box sx={{ width: "60vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography>
            {stockInfo && stockInfo.bestMatches[0]["2. name"]}
          </Typography>
          {console.log(stockDataset)}
          <Typography sx={{ marginLeft: "1rem" }}>
            {stockInfo && symbol}
          </Typography>
        </Box>
      </Box>
      <hr></hr>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
      <Box>{stockDataset && <StockChart chartData={stockDataset} />}</Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography>Open</Typography>
          <Typography>374298</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography>High</Typography>
          <Typography>374298</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography>Low</Typography>
          <Typography>374298</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography>Close</Typography>
          <Typography>374298</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography>Adjusted Close</Typography>
          <Typography>374298</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography>Volume</Typography>
          <Typography>374298</Typography>
        </Box>
      </Box>
    </Box>
  );
}
