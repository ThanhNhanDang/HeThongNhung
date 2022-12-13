import React from "react";
import "./Dashboard.css";

import LineChart from "../../components/LineChart";
import RadialBar from "../../components/RadialBar";
import MQTTState from "../../components/MQTTState";

function Dashboard({ mobile }) {
  return (
    <>
      <MQTTState />
      <div className="dashboard" style={{ display: mobile ? "table" : "flex" }}>
        <div
          className="card"
          style={{ width: mobile ? 350 : "40%", height: mobile ? 250 : 500 }}
        >
          <RadialBar />
        </div>
        <div
          className="card"
          style={{ width: mobile ? 350 : "60%", height: mobile ? 250 : 500 }}
        >
          <LineChart height={mobile ? 250 : 500} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
