import axios from "axios";
import getStockData from "../../utilities/getStockData";
import { nanoid } from "nanoid";
export default function getDataFor1day(symbol, setStockDataset) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=10min&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        getDataFor1day(symbol, setStockDataset);
      } else {
        setStockDataset(getStockData(res.data["Time Series (5min)"]));
      }
    });
}
