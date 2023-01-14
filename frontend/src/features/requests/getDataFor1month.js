import axios from "axios";
import getStockData from "../../utilities/getStockData";
import { nanoid } from "nanoid";

export default function getDataFor1month(symbol, setStockDataset) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        getDataFor1month(symbol, setStockDataset);
      } else {
        setStockDataset(getStockData(res.data["Time Series (Daily)"], 30));
      }
    });
}
