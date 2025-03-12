import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "./TrafficChart.css";

Chart.register(...registerables);

const TrafficChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); 
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/trafficData.json") 
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  useEffect(() => {
    if (!chartData) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets.map((dataset) => ({
          ...dataset,
          borderWidth: 1,
          pointRadius: 6,
          pointBackgroundColor: "white",
          fill: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            labels: {
              color: "white",
              usePointStyle: true,
              pointStyle: "circle",
              borderWidth: 0,
              padding: 24,
              font: {
                size: 14,
              },
              generateLabels: function (chart) {
                return chart.data.datasets.map((dataset, i) => ({
                  text: dataset.label,
                  fillStyle: dataset.borderColor, 
                  strokeStyle: dataset.borderColor, 
                  lineWidth: 0, 
                  fontColor: "white",
                }));
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
              padding: 10,
              drawticks: true,
            },
            grid: {
              display: false,
              drawTicks: true,
              tickColor: "white",
              tickLength: 10,
            },
            border: {
              display: true,
              color: "white",
            },
          },
          y: {
            beginAtZero: true,
            max: 1000,
            ticks: {
              stepSize: 250,
              color: "white",
              padding: 10,
              drawticks: true,
            },
            grid: {
              display: false,
              drawTicks: true,
              tickColor: "white",
              tickLength: 10,
            },
            border: {
              display: true,
              color: "white",
            },
          },
        },
      },
      plugins: [
        {
          id: "customTicks",
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            const xAxis = chart.scales.x;
            const yAxis = chart.scales.y;

            ctx.save();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;

            yAxis.ticks.forEach((tick) => {
              const y = yAxis.getPixelForValue(tick.value);
              ctx.beginPath();
              ctx.moveTo(xAxis.left - 10, y); 
              ctx.lineTo(xAxis.left + 1, y);
              ctx.stroke();
            });

            xAxis.ticks.forEach((tick) => {
              const x = xAxis.getPixelForValue(tick.value);
              ctx.beginPath();
              ctx.moveTo(x, yAxis.bottom - 1); 
              ctx.lineTo(x, yAxis.bottom + 10);
              ctx.stroke();
            });

            ctx.restore();
          },
        },
      ],
    });
  }, [chartData]);

  return (
    <div className="chart-container">
      {!chartData ? <p>Loading data...</p> : <canvas ref={chartRef} />}
    </div>
  );
};

export default TrafficChart;