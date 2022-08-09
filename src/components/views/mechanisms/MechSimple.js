import * as React from "react";
import { Box, Typography } from "@mui/material";
import NodeSelection from "./NodeSelection";

class MechSimple extends React.Component {
  render() {
    const { model, model: { options }, engine, changeVisibility } = this.props;

    return (
      <Box className={`primary-node ${options?.variant}`}>
        {options.selected && (
          <NodeSelection node={model} engine={engine} text={"Show properties"} changeVisibility={changeVisibility} />
        )}
        <Box
          className="primary-node_header"
        >
          <Box className="icon" />
          <Typography component="p">
            {options.name}
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default MechSimple;
