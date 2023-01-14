import axios from "axios";
import { nanoid } from "nanoid";
import emitWarnToast from "../../utilities/emitWarnToast";
import { changePrice, changeSymbol } from "../slices/stockPriceSlice";

export default function getStockPrice(
  symbol,
  setStockPrice,
  first = true,
  dispatch
) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        if (first) {
          getStockPrice(symbol, setStockPrice, false);
        } else {
          emitWarnToast("error while fetching Stock Information");
        }
      } else if (res.data["Error Message"]) {
        emitWarnToast("error while fetching Stock Information");
      } else {
        var key = Object.keys(res.data["Time Series (5min)"])[0];
        setStockPrice(res.data["Time Series (5min)"][key]);
        dispatch(changePrice(res.data["Time Series (5min)"][key]["4. close"]));
        dispatch(changeSymbol(symbol));
      }
    });
}
