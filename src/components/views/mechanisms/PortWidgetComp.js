import * as React from "react";
import { Box } from "@mui/material";
import { PortWidget } from "@projectstorm/react-diagrams";

const PortWigetComp = (props) => {
  const { engine, port, direction, startPoints } = props;
  return (
    <PortWidget
      engine={engine}
      port={port.getPort(direction)}
    >
      <Box style={startPoints} className="pointer" />
    </PortWidget>
  )
}
export default PortWigetComp;