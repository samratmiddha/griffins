import axios from "axios";
import getStockData from "../../utilities/getStockData";
import { nanoid } from "nanoid";

export default function getDataFor3year(symbol, setStockDataset) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        getDataFor3year(symbol, setStockDataset);
      } else {
        setStockDataset(getStockData(res.data["Weekly Time Series"], 156));
      }
    });
}
