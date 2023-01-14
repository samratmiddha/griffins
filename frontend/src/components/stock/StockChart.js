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
import getDataFor1day from "../../features/requests/getDataFor1day";
import getDataFor3year from "../../features/requests/getDataFor3year";
import getDataFor1year from "../../features/requests/getDataFor1year";
import getDataFor3month from "../../features/requests/getDataFor3month";
import getDataFor1month from "../../features/requests/getDataFor1month";
import getDataFor1week from "../../features/requests/getDataFor1week";
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
      getDataFor1week(symbol, props.setStockDataset);
    } else if (props.chartOption === "1M") {
      getDataFor1month(symbol, props.setStockDataset);
    } else if (props.chartOption === "3M") {
      getDataFor3month(symbol, props.setStockDataset);
    } else if (props.chartOption === "1Y") {
      getDataFor1year(symbol, props.setStockDataset);
    } else if (props.chartOption === "3Y") {
      getDataFor3year(symbol, props.setStockDataset);
    } else if (props.chartOption === "1D") {
      getDataFor1day(symbol, props.setStockDataset);
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
