import axios from "axios";
import getStockData from "../../utilities/getStockData";
import { nanoid } from "nanoid";
import emitWarnToast from "../../utilities/emitWarnToast";
export default function getDataFor1day(symbol, setStockDataset, first = true) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=10min&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        if (first) {
          getDataFor1day(symbol, setStockDataset, false);
        } else {
          emitWarnToast("Error While Fetching Data");
        }
      } else if (res.data["Error Message"]) {
        emitWarnToast("Data Not Available Please Try other option");
      } else {
        setStockDataset(getStockData(res.data["Time Series (5min)"]));
      }
    });
}
