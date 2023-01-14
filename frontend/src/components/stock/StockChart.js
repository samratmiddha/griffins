import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import getStockData from "../../utilities/getStockData";
import handleCsv from "../../utilities/csvHandler";
import { useSearchParams } from "react-router-dom";
Chart.register([CategoryScale, LinearScale, BarElement, Legend, Tooltip]);

export const StockChart = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const colourArray = [];
  props.chartData.map((item) => {
    if (item.trend === "I") {
      colourArray.push("#00FF00");
    } else {
      colourArray.push("#FF0000");
    }
  });
  const image = new Image();
  image.src = "https://www.chartjs.org/img/chartjs-logo.svg";

  useEffect(() => {
    if (props.chartOption === "1W") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=15min&slice=year1month1&apikey=${nanoid()}`
        )
        .then((res) => {
          props.setStockDataset(handleCsv(res.data, 250));
        });
    } else if (props.chartOption === "1M") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${nanoid()}`
        )
        .then((res) => {
          props.setStockDataset(
            getStockData(res.data["Time Series (Daily)"], 30)
          );
        });
    } else if (props.chartOption === "3M") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${nanoid()}`
        )
        .then((res) => {
          props.setStockDataset(
            getStockData(res.data["Time Series (Daily)"], 100)
          );
        });
    } else if (props.chartOption === "1Y") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${nanoid()}`
        )
        .then((res) => {
          props.setStockDataset(
            getStockData(res.data["Weekly Time Series"], 52)
          );
        });
    } else if (props.chartOption === "5Y") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${nanoid()}`
        )
        .then((res) => {
          props.setStockDataset(
            getStockData(res.data["Weekly Time Series"], 260)
          );
        });
    } else if (props.chartOption === "1D") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${nanoid()}`
        )
        .then((res) => {
          console.log("intraday-data", res.data);
          props.setStockDataset(getStockData(res.data["Time Series (5min)"]));
        });
    }
  }, [props.chartOption]);
  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: props.chartData.map((item) => item.time),
          datasets: [
            {
              data: props.chartData.map((item) => {
                return [item.low, item.high];
              }),
              backgroundColor: colourArray,
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            customCanvasBackgroundColor: {
              backgroundColor: "",
            },
            title: {
              display: true,
            },
            tooltip: {
              enabled: true,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                display: false,
                color: "white",
              },
              border: {
                color: "white",
              },
            },
            x: {
              beginAtZero: false,
              grid: {
                display: false,
              },
              border: {
                color: "white",
              },
            },
          },
        }}
      />
    </div>
  );
};
