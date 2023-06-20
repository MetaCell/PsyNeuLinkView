import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { PortWidget } from '@projectstorm/react-diagrams';
// import { RemoveIcon } from './Icons';

class InputOutputNode extends React.Component {
  render() {
    const { text, direction, engine, port } = this.props;
    const nodeClass = direction === 'right' ? 'block reverse' : 'inline-block';

    return (
      <Box className={nodeClass} justifyContent="space-between">
        <Box>
          <IconButton
            sx={{
              zIndex: 1009101,
              padding: 0,
            }}
            disableRipple
            size="small"
          >
            {/* <RemoveIcon /> */}
          </IconButton>
        </Box>
        <PortWidget engine={engine} port={port} className="disc">
          <Box />
        </PortWidget>
        <Typography>{text}</Typography>
      </Box>
    );
  }
}

export default InputOutputNode;
