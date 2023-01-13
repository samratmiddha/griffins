import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.register([CategoryScale, LinearScale, BarElement, Legend, Tooltip]);
export const StockChart = (props) => {
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
  return (
    <div
      className="chart-container"
      style={{
        background: "#000000" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to right, #434343, #000000)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to right, #434343, #000000)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={{
          labels: props.chartData.map((item) => item.time),
          // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
          datasets: [
            {
              data: props.chartData.map((item) => {
                return [item.low, item.high];
              }),
              // you can set indiviual colors for each bar
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
            id: "customCanvasBackgroundImage",
            beforeDraw: (chart) => {
              if (image.complete) {
                const ctx = chart.ctx;
                const { top, left, width, height } = chart.chartArea;
                const x = left + width / 2 - image.width / 2;
                const y = top + height / 2 - image.height / 2;
                ctx.drawImage(image, x, y);
              } else {
                image.onload = () => chart.draw();
              }
            },
          },
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};
