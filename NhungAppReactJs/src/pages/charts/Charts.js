import React from "react";
import LineChart from "../../components/LineChart";
import Table from "../../components/Table";

function Charts({ mobile }) {
  return (
  <div className="charts" style={{ display: mobile ? "table" : "flex" }}>
      <div
        className="card"
        style={{ width: mobile ? 350 : "60%", height: mobile ? 250 : 500 }}
      >
        <LineChart height={mobile ? 250 : 500} />
      </div>
      <div className="card">
        <Table mobile={mobile} />
      </div>
    </div>
  );
}

export default Charts;
