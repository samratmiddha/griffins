import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StockInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [stockInfo, setStockInfo] = useState();
  const [chartOption, setChartOption] = useState("1W");
  function handleCsv(data, instances) {
    var allRows = data.split(/\r?\n|\r/);
    var table = "<table>";
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      var rowCells = allRows[singleRow].split(",");
    }
  }
  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=SMP8GAVC4EB65JI0`
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
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=SMP8GAVC4EB65JI0"
        )
        .then((res) => {
          console.log("intraday-data", res.data);
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
          <Typography sx={{ marginLeft: "1rem" }}>
            {stockInfo && symbol}
          </Typography>
        </Box>
      </Box>
      <hr></hr>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
      <Box></Box>
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
