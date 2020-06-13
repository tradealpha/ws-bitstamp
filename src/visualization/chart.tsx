import React from "react";

import { Line } from "react-chartjs-2";

const lineData = (
  chartLabel: string,
  data: number[],
  labels: string[] = []
): { labels?: string[]; datasets: any } => ({
  labels,
  datasets: [
    {
      label: chartLabel,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data,
    },
  ],
});

const lineChartOptions = {
  //responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: true,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    ],
  },
};

export default (props: {
  chartLabel?: string;
  data: number[];
  labels: string[];
}) => {
  const { data, labels, chartLabel = "" } = props;
  const d = lineData(chartLabel, data, labels);
  return <Line data={d} options={lineChartOptions} />;
};
