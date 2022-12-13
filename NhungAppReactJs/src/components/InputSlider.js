import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { useEffect, useState } from "react";
const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
  const { message } = useSubscription([
    "gas/general",
    "gas/feedback/PPMThresold",
  ]);
  const { client } = useMqttState();
  const [value, setValue] = useState(300);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (message) {
      const json = JSON.parse(message.message);
      if (!isChange) {
        setValue(json.PPMThresold);
      } else if (message.topic === "gas/feedback/PPMThresold") {
        setValue(json.PPMThresold);
      }
    }
  }, [message]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setIsChange(true);
    // client.publish(
    //   "gas/change/PPMThresold",
    //   `{"idtp":2, "PPMThresold":${newValue}}`
    // );
  };

  const handleSliderChange2 = (event, newValue) => {
    client.publish(
      "gas/change/PPMThresold",
      `{"idtp":2, "PPMThresold":${newValue}}`
    );
  };

  const handleInputChange = (event) => {
    setIsChange(true);
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 300) {
      client.publish(
        "gas/change/PPMThresold",
        `{"idtp":2, "PPMThresold":${300}}`
      );
      setValue(300);
    } else if (value > 10000) {
      client.publish(
        "gas/change/PPMThresold",
        `{"idtp":2, "PPMThresold":${10000}}`
      );
      setValue(10000);
    } else
      client.publish(
        "gas/change/PPMThresold",
        `{"idtp":2, "PPMThresold":${value}}`
      );
  };

  return (
    <Box sx={{ width: 350 }}>
      <Typography id="input-slider" gutterBottom>
        Ngưỡng cảnh báo
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderChange2}
            max={10000}
            min={300}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            sx={{ width: 60 }}
            value={value}
            size="medium"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 300,
              max: 10000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
