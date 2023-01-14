import axios from "axios";
import { nanoid } from "nanoid";
import emitWarnToast from "../../utilities/emitWarnToast";

export default function getStockInfo(symbol, setStockInfo, first = true) {
  axios
    .get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${nanoid()}`
    )
    .then((res) => {
      if (res.data["Note"]) {
        if (first) {
          getStockInfo(symbol, setStockInfo, false);
        } else {
          emitWarnToast(
            "error while fetching Stock Information. Please Refresh"
          );
        }
      } else if (res.data["Error Message"]) {
        emitWarnToast("error while fetching Stock Information");
      } else {
        setStockInfo(res.data);
      }
    });
}
