import * as React from "react";
import { withStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import NodeSelection from "./NodeSelection";
import { PortWidget } from "@projectstorm/react-diagrams";

const styles = () => ({
});

class MechSimple extends React.Component {
  render() {
    const { classes, model, model: { options }, engine, changeVisibility } = this.props;

    const customNodeStyles = {
      background: options.variant.backgroundColor,
      borderColor: options.variant.borderColor,
      boxShadow: options.variant.boxShadow,
    }

    return (
      <Box position='relative'>
        {options.selected && (
          <NodeSelection node={model} engine={engine} text={"Show properties"} changeVisibility={changeVisibility} />
        )}

        <Box
          className="node"
          style={customNodeStyles}
        >
          <img src={options.icon} alt={options.name} />
          <Typography component="p" style={{ color: options.variant.textColor }}>
            {options.name}
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(MechSimple);
