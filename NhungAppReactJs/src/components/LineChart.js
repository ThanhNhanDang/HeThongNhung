import { useSubscription } from "mqtt-react-hooks";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./LineChart.css";

function LineChart({ height }) {
  const ApexCharts = window.ApexCharts;
  const { message } = useSubscription(["gas/general"]);
  const [stop, setStop] = useState(false);
  const [PPMThresold, setPPMThresold] = useState(0);
  const [series, setSeries] = useState([
    {
      name: "PPM",
      data: [],
    },
  ]);

  useEffect(() => {
    if (!stop)
      if (message) {
        const json = JSON.parse(message.message);
        if (series[0].data.length > 1000) {
          series[0].data.shift();
        }
        if (json.PPMThresold !== PPMThresold) {
          setPPMThresold(json.PPMThresold);
          setOptions((options) => ({
            ...options,
            annotations: {
              yaxis: [
                {
                  ...options.annotations.yaxis[0],
                  y: json.PPMThresold,
                  label: {
                    ...options.annotations.yaxis[0].label,
                    text: "Ngưỡng báo động: " + json.PPMThresold,
                  },
                },
              ],
            },
            fill: {
              ...options.fill,
              gradient: {
                ...options.fill.gradient,
                colorStops: [
                  {
                    offset: Math.floor(95 - (json.PPMThresold / 10000) * 100),
                    color: "#fa0101",
                    opacity: 1,
                  },
                  {
                    offset: 100,
                    color: "#5af31d",
                    opacity: 1,
                  },
                ],
              },
            },
          }));
        }
        setSeries((series) => [
          {
            data: [...series[0].data, [new Date().getTime(), json.PPMval]],
          },
        ]);
      }
  }, [message]);

  const [options, setOptions] = useState({
    chart: {
      id: "area-datetime",
      type: "line",
      zoom: {
        autoScaleYaxis: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    stroke: {
      curve: "smooth",
    },
    annotations: {
      yaxis: [
        {
          y: PPMThresold,
          borderColor: "red",
          label: {
            show: true,
            text: "Ngưỡng báo động: " + PPMThresold,
            style: {
              color: "#fff",
              background: "red",
            },
          },
        },
      ],
    },
    xaxis: {
      type: "datetime",
      min: new Date().getTime(),
      tickAmount: 5,
      title: {
        text: "Time",
      },
      labels: {
        formatter: function (value) {
          const date = new Date(value);
          return date.toLocaleString("vi-VN");
        },
      },
    },
    yaxis: {
      title: {
        text: "PPM",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        colorStops: [
          {
            offset: 95,
            color: "#fa0101",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#5af31d",
            opacity: 1,
          },
        ],
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  const [selection, setSelection] = useState("all");

  function updateData(timeline) {
    setSelection(timeline);
    const currentTime = new Date(series[0].data[series[0].data.length - 1][0]);
    let beforeTime = new Date(series[0].data[series[0].data.length - 1][0]);
    switch (timeline) {
      case "one_minute":
        beforeTime.setMinutes(currentTime.getMinutes() - 2);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          beforeTime.getTime(), // trước sau
          currentTime.getTime()
        );
        break;
      case "five_minutes":
        beforeTime.setMinutes(currentTime.getMinutes() - 5);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          beforeTime.getTime(),
          currentTime.getTime()
        );
        break;
      case "fifteen_minutes":
        beforeTime.setMinutes(currentTime.getMinutes() - 15);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          beforeTime.getTime(),
          currentTime.getTime()
        );
        break;
      case "half_hour":
        beforeTime.setMinutes(currentTime.getMinutes() - 30);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          beforeTime.getTime(),
          currentTime.getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(series[0].data[0][0]).getTime(),
          currentTime.getTime()
        );
        break;
      default:
    }
  }

  return (
    <div id="chart">
      <div className="toolbar">
        <h3>Biểu đồ mật độ khí gas trong không khí</h3>
        <button
          onClick={() => setStop(!stop)}
          className={stop ? "active-button-stop" : "stop"}
        >
          {stop ? "Start" : "Stop"}
        </button>
        <button
          id="one_minute"
          onClick={() => updateData("one_minute")}
          className={selection === "one_minute" ? "active-button" : ""}
        >
          1m
        </button>
        &nbsp;
        <button
          id="five_minutes"
          onClick={() => updateData("five_minutes")}
          className={selection === "five_minutes" ? "active-button" : ""}
        >
          5m
        </button>
        &nbsp;
        <button
          id="fifteen_minutes"
          onClick={() => updateData("fifteen_minutes")}
          className={selection === "fifteen_minutes" ? "active-button" : ""}
        >
          15m
        </button>
        &nbsp;
        <button
          id="half_hour"
          onClick={() => updateData("half_hour")}
          className={selection === "half_hour" ? "active-button" : ""}
        >
          30m
        </button>
        &nbsp;
        <button
          id="all"
          onClick={() => updateData("all")}
          className={selection === "all" ? "active-button" : ""}
        >
          ALL
        </button>
      </div>

      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          height={height - 60}
          series={series}
          type="line"
        />
      </div>
    </div>
  );
}

export default LineChart;
