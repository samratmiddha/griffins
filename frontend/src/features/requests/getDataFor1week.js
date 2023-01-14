import axios from "axios";
import handleCsv from "../../utilities/csvHandler";
import { nanoid } from "nanoid";
import emitWarnToast from "../../utilities/emitWarnToast";

export default function getDataFor1week(symbol, setStockDataset, first = true) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=60min&slice=year1month1&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        if (first) {
          getDataFor1week(symbol, setStockDataset, false);
        } else {
          emitWarnToast("Error While Fetching Data");
        }
      } else if (res.data["Error Message"]) {
        emitWarnToast("Data Not Available Please Try other option");
      } else {
        setStockDataset(handleCsv(res.data, 70));
      }
    });
}
