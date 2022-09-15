import * as React from "react";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import NodeSelection from "./NodeSelection";
import InputOutputNode from "./InputOutputNode";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { PortTypes, PortWidget } from "@metacell/meta-diagram";
import vars from "../../../assets/styles/variables";

const styles = {
  textColor: {
    color: vars.functionTextColor
  },
  codeColor: {
    color: vars.functionCodeColor
    }
};

class MechMetadata extends React.Component {
  render() {
    const { classes, model, model: { options }, engine, changeVisibility } = this.props;
    console.log(classes)
    const functionValues = (label, value) => (
      <Box className="block">
        <Typography component="label">{label}</Typography>
        {/* <TextField
          id="outlined-multiline-flexible"
          maxRows={4}
          value={value}
          onChange={ (e) => {console.log(e)} }
          variant="outlined"
          style={{ zIndex: 11 }}
        /> */}
        <Typography>{value}</Typography>
      </Box>
    )
    return (
      <Box className={`primary-node rounded ${options.variant}`}>
        {options.selected && (
          <NodeSelection node={model} engine={engine} text={"Hide properties"} changeVisibility={changeVisibility} />
        )}
          <Box className="primary-node_header">
            <Box className="icon" />
            <Typography component="p">
              {options.name}
            </Typography>
          </Box>

          <Box>
          { options.ports.map(port => {
            switch (port.getType()) {
              case PortTypes.INPUT_PORT:
                return (
                  <PortWidget key={model.getID() + '_' + port.getId()} engine={engine} port={model.getPort(port.getId())}>
                    <InputOutputNode text={port.getId()} />
                  </PortWidget>
                );
              default:
                return <></>
            }
          })}
          </Box>

          <Box className="seprator" />

          <Box className="block-wrapper">
            {
              functionValues('Context', '12')
            }
            {
              functionValues('Size', '8.90')
            }
            {
              functionValues('Prefs', '44')
            }
            <Box className="block">
              <Typography component="label">Function</Typography>
              <Typography className="function">
                <Typography component="strong" className={classes?.textColor} >
                  function
                </Typography>=pnl.<Typography className={classes?.codeColor} component="strong">Logistic</Typography>(gain=1.0, bias=-4)</Typography>
            </Box>
          </Box>

          <Box className="seprator" />

          <Box>
          { options.ports.map(port => {
            switch (port.getType()) {
              case PortTypes.OUTPUT_PORT:
                return (
                  <PortWidget key={model.getID() + '_' + port.getId()} engine={engine} port={model.getPort(port.getId())}>
                    <InputOutputNode text={port.getId()} direction="right" />
                  </PortWidget>
                );
              default:
                return <></>
            }
          })}
          </Box>
        </Box>
    );
  }
}

export default withStyles(styles)(MechMetadata);
