import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import Typography from '@mui/material/Typography';
import InputOutputNode from '../shared/InputOutputNode';
import vars from '../../../../../assets/styles/variables';
import { PortTypes, PortWidget } from '@metacell/meta-diagram';
import { MechIcon } from '../shared/Icons';

const styles = {
  textColor: {
    color: vars.functionTextColor,
  },
  codeColor: {
    color: vars.functionCodeColor,
  },
};

class MechMetadata extends React.Component {
  render() {
    const {
      classes,
      model,
      model: { options },
      engine,
      changeVisibility,
      handleUpdate,
    } = this.props;

    const functionValues = (label, value) => (
      <Box className="block">
        <Typography component="label">{label}</Typography>
        <Typography>{value}</Typography>
      </Box>
    );

    return (
      <Box className={`primary-node rounded ${options.variant}`}>
        {options.selected && (
          <NodeSelection
            node={model}
            engine={engine}
            text={'Hide properties'}
            changeVisibility={changeVisibility}
          />
        )}
        <Box className="primary-node_header">
          <Box className="icon-wrapper">
            <MechIcon />
          </Box>
          <Typography component="p">{options.name}</Typography>
        </Box>

        <Box>
          {options.ports.map((port) => {
            switch (port.getType()) {
              case PortTypes.INPUT_PORT:
                return (
                  <PortWidget
                    key={model.getID() + '_' + port.getId()}
                    engine={engine}
                    port={model.getPort(port.getId())}
                  >
                    <InputOutputNode text={port.getId()} />
                  </PortWidget>
                );
              default:
                return <></>;
            }
          })}
        </Box>

        <Box className="seprator" />

        <Box className="block-wrapper" zIndex={1009101}>
          <Box className="block">
            <Typography component="label">Function</Typography>
            <Typography className="function">
              <TextField
                id="outlined-multiline-flexible"
                maxRows={4}
                value={options.function}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // this needs to get the new input value from the input text and update this in the options.function
                  options.function = e.target.value;
                }}
              />
            </Typography>
          </Box>
        </Box>

        <Box className="seprator" />

        <Box>
          {options.ports.map((port) => {
            switch (port.getType()) {
              case PortTypes.OUTPUT_PORT:
                return (
                  <PortWidget
                    key={model.getID() + '_' + port.getId()}
                    engine={engine}
                    port={model.getPort(port.getId())}
                  >
                    <InputOutputNode text={port.getId()} direction="right" />
                  </PortWidget>
                );
              default:
                return <></>;
            }
          })}
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(MechMetadata);
