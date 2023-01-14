import axios from "axios";
import handleCsv from "../../utilities/csvHandler";
import { nanoid } from "nanoid";

export default function getDataFor1week(symbol, setStockDataset) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=60min&slice=year1month1&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        getDataFor1week(symbol, setStockDataset);
      } else {
        setStockDataset(handleCsv(res.data, 70));
      }
    });
}
