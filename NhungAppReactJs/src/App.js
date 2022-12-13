import { Connector } from "mqtt-react-hooks";
import React, { useEffect, useState } from "react";
import Router from "./routes";

function App() {
  const options = {
    hostname: process.env.REACT_APP_MQTT_URL,
    username: process.env.REACT_APP_MQTT_USERNAME,
    password: process.env.REACT_APP_MQTT_PASSWORD,
    // port: process.env.REACT_APP_MQTT_PORT,
    protocol: "wss",
  };
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Connector options={options} parserMethod={(msg) => msg}>
      <Router mobile={mobile} />;
    </Connector>
  );
}

export default App;
