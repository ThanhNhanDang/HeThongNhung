import { useSubscription } from "mqtt-react-hooks";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function RadialBar() {
  const { message } = useSubscription(["gas/general"]);
  const [series, setSeries] = useState([0]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            formatter: function (val) {
              //đổi qua phần trăm sau đó làm tròn thành 2 chữ số thâp phân
              return Math.round(val * 100 * 100) / 100;
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["PPM"],
    colors: ["#38d39f"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
  });

  useEffect(() => {
    if (message) {
      const json = JSON.parse(message.message);
      if (json.PPMval !== 0) {
        if (json.PPMval > json.PPMThresold)
          setOptions((options) => ({ ...options, colors: ["#e10a0a"] }));
        else setOptions((options) => ({ ...options, colors: ["#38d39f"] }));
      }
      setSeries([(json.PPMval / 10000) * 100]);
    }
  }, [message]);

  return (
    <>
      <h3>Mật độ khí gas trong không khí</h3>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
      ></ReactApexChart>
    </>
  );
}

export default RadialBar;
