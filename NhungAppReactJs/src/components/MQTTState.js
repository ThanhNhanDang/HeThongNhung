import { useMqttState } from "mqtt-react-hooks";
import React from "react";

function MQTTState() {
  const { connectionStatus } = useMqttState();

  return (
    <div className="mqtt-state">
      <div className="card">
        <h2>MQTT state: {connectionStatus}</h2>
      </div>
    </div>
  );
}

export default MQTTState;
