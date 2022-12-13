import React from "react";
import InputSlider from "../../components/InputSlider";
import MQTTState from "../../components/MQTTState";

function Setting() {
  return (
    <div className="container">
      <div className="center">
        <MQTTState />
        <InputSlider />
        {/* <button className="btn" onClick={() => onClick("O")}>
          Bật tắt loa
        </button>
        <button className="btn" onClick={() => onClick("R")}>
          Reboot
        </button> */}
      </div>
    </div>
  );
}

export default Setting;
