import axios from "axios";
import getStockData from "../../utilities/getStockData";
import { nanoid } from "nanoid";
import emitWarnToast from "../../utilities/emitWarnToast";
export default function getDataFor3month(
  symbol,
  setStockDataset,
  first = true
) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        if (first) {
          getDataFor3month(symbol, setStockDataset, false);
        } else {
          emitWarnToast("Error While Fetching Data");
        }
      } else if (res.data["Error Message"]) {
        emitWarnToast("Data Not Available Please Try other option");
      } else {
        setStockDataset(getStockData(res.data["Time Series (Daily)"], 100));
      }
    });
}
