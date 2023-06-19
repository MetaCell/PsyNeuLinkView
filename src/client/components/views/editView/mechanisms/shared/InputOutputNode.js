import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { PortWidget } from '@projectstorm/react-diagrams';
import { RemoveIcon } from './Icons';

class InputOutputNode extends React.Component {
  render() {
    const { text, direction, engine, port, removePort } = this.props;
    const nodeClass = direction === 'right' ? 'block reverse' : 'block';

    return (
      <Box
        className={nodeClass}
        sx={{
          justifyContent: 'space-between !important',
          flexDirection: direction === 'right' ? 'row' : 'row-reverse',
        }}
      >
        {!!removePort ? (
          <IconButton
            sx={{
              zIndex: 1009101,
              padding: 0,
            }}
            size="small"
            onClick={() => {
              if (removePort) removePort(port, text);
            }}
            disableRipple
          >
            <RemoveIcon />
          </IconButton>
        ) : null}
        <Box display="flex" alignItems="center">
          <PortWidget engine={engine} port={port} className="disc">
            <Box />
          </PortWidget>
          <Typography>{text}</Typography>
        </Box>
      </Box>
    );
  }
}

export default InputOutputNode;
