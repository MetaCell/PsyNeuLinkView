import React from 'react';
import PropTypes from 'prop-types';
import { PortWidget } from '@metacell/meta-diagram';
import { Box } from '@mui/material';
import InputOutputNode from './InputOutputNode';

const PortsList = ({ ports, portType, model, engine, onAdd, direction }) => {
  return (
    <Box>
      {ports.map((port) => {
        const portModel = model.getPort(port.getId());

        switch (port.getType()) {
          case portType: {
            return (
              <PortWidget
                key={model.getID() + '_' + port.getId()}
                engine={engine}
                port={portModel}
              >
                <InputOutputNode
                  key={model.getID() + '_' + port.getId()}
                  text={port.getId()}
                  port={portModel}
                  engine={engine}
                  direction={direction}
                />
              </PortWidget>
            );
          }
          default:
            return <></>;
        }
      })}
    </Box>
  );
};

export default PortsList;

PortsList.propTypes = {
  ports: PropTypes.array.isRequired,
  portType: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  direction: PropTypes.string,
};
