import React from 'react';
import PropTypes from 'prop-types';
import { MetaPort, PortTypes, PortWidget } from '@metacell/meta-diagram';
import { Box, IconButton, Stack } from '@mui/material';
import InputOutputNode from './InputOutputNode';
import { AddIcon } from './Icons';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';

const PortsList = ({
  ports,
  portType,
  model,
  engine,
  direction,
  handleValueChange,
}) => {
  //TODO: Wrap input node with port widget again if problematic
  /**
   *  remove code block because nested comp breaks node styling rules
   * <PortWidget key={model.getID() + '_' + port.getId()} engine={engine}   port={portModel} >
   */

  function addPortToModel(name) {
    switch (portType) {
      case PortTypes.INPUT_PORT:
        model.addPort(
          new DefaultPortModel({
            in: true,
            name,
          })
        );
        break;
      case PortTypes.OUTPUT_PORT:
        model.addPort(
          new DefaultPortModel({
            in: false,
            name,
          })
        );
        break;
      default:
        console.error('Port type');
    }
  }

  async function addPorts() {
    const newPorts = [...ports];
    const filteredPorts = ports.filter((port) => port.type === portType);
    const lastPort = filteredPorts.slice(-1)[0];
    const strToNum = lastPort?.name?.split('-')?.slice(-1);
    const lastIndex = !isNaN(Number(strToNum)) ? Number(strToNum) : -1;
    const currentIndex = lastIndex + 1;
    const name = portType + '-' + portType + '-' + currentIndex;

    newPorts.push(
      new MetaPort(
        name,
        name,
        portType,
        new Point(currentIndex, currentIndex),
        new Map()
      )
    );

    await addPortToModel(name);

    if (handleValueChange) handleValueChange({ key: 'ports', value: newPorts });
  }

  function removePort(port, portId) {
    const filteredPorts = ports.filter((port) => port.id !== portId);
    model.removePort(port); // remove target port in target node

    if (handleValueChange)
      handleValueChange({ key: 'ports', value: filteredPorts });

    engine.repaintCanvas();
  }

  return (
    <Stack
      spacing={0.5}
      direction={
        portType === PortTypes.INPUT_PORT ? 'column-reverse' : 'column'
      }
      sx={{
        zIndex: 1009101,
      }}
    >
      <Stack>
        {ports.map((port) => {
          const portModel = model.getPort(port.getId());

          switch (port.getType()) {
            case portType: {
              return (
                <InputOutputNode
                  key={model.getID() + '_' + port.getId()}
                  text={port.getId()}
                  port={portModel}
                  engine={engine}
                  direction={direction}
                  removePort={removePort}
                />
              );
            }
            default:
              return <></>;
          }
        })}
      </Stack>
      <Box display="flex" justifyContent="center">
        <IconButton
          onClick={addPorts}
          sx={{
            zIndex: 1009101,
            padding: 0,
          }}
          size="small"
          disableRipple
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default PortsList;

PortsList.propTypes = {
  ports: PropTypes.array.isRequired,
  portType: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  direction: PropTypes.string,
};
