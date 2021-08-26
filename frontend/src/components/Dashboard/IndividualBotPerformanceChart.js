import React from "react";
import { Line } from "react-chartjs-2";

export default (props) => {
  return (
    <Line
      options={{
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: "#fff",
              },
              ticks: {
                fontColor: "#fff",
              },
            },
          ],
          yAxes: [
            {
              // position: "right",
              ticks: {
                fontColor: "#fff",
              },
            },
          ],
        },
      }}
      data={{
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [
          {
            data: [0, 10, 20, 10, 40, 50, 20, 35, 55, 30, 25, 15, 30, 40, 30],
            pointBorderWidth: 2,
            fill: true,
            borderColor: "#5C87DC",
            backgroundColor: "rgba(92, 135, 220, 0.1)",
            label: "UBY",
          },
          {
            data: [10, 40, 25, 40, 50, 30, 15, 25, 35, 40, 10, 55, 30, 15, 30],
            pointBorderWidth: 2,
            fill: true,
            borderColor: "#74E3CE",
            backgroundColor: "rgba(116, 227, 206, 0.1",
            label: "IOT",
          },
          {
            data: [20, 30, 55, 40, 30, 40, 40, 20, 30, 10, 25, 30, 55, 30, 20],
            pointBorderWidth: 2,
            fill: true,
            borderColor: "#F9DB6D",
            backgroundColor: "rgba(249, 219, 109, 0.1)",
            label: "TOI",
          },
        ],
      }}
    />
  );
};
