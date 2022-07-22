import * as React from "react";
import { withStyles } from "@mui/styles";
import { Box, Button } from "@mui/material";
import { PortWidget } from "@projectstorm/react-diagrams";

// const styles = () => ({
//   nodes: {
//     width: '10rem',
//     height: '10rem',
//     border: '0.09375rem solid #18A0FB',
//     zIndex: 10,
//     position: 'absolute',
//   },

//   nodesDefault: {
//     width: '100%',
//     height: '100%',
//   },

//   node: {
//     width: '0.625rem',
//     height: '0.625rem',
//     background: '#FFFFFF',
//     border: '0.09375rem solid #18A0FB',
//     borderRadius: '0.125rem',
//     position: 'absolute',
//   },

//   button: {
//     '&.MuiButton-root': {
//       backgroundColor: '#161A1E',
//       borderRadius: '1.125rem',
//       fontWeight: 600,
//       fontSize: '0.8125rem',
//       display: 'flex',
//       lineHeight: '1rem',
//       letterSpacing: '-0.025625rem',
//       color: 'rgba(255, 255, 255, 0.8)',
//       margin: '0 !important',
//       width: '9.625rem',
//       padding: '0',
//       height: '2.25rem',
//       position: 'absolute',
//       top: '-2.625rem',
//       fontFamily: 'Inter,sans-serif',
//       left: '50%',
//       transform: 'translateX(-50%)',

//       '&:hover': {
//         backgroundColor: '#161A1E',
//       },
//     },
//   },

//   circle: {
//     width: '1rem',
//     border: 'solid 0.0625rem',
//     height: '1rem',
//     borderRadius: '50%',
//     marginRight: '1.25rem',
//     position: 'relative',

//     '&:after': {
//       content: '""',
//       height: '1.75rem',
//       width: '0.0625rem',
//       display: 'block',
//       position: 'absolute',
//       right: '-0.625rem',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     },
//   },
// });

class NodeSelection extends React.Component {
  render() {
    const { classes, node, node: { options }, engine, text, changeVisibility } = this.props;

    // const nodeClass = options.shape === 'default' ? classes.nodesDefault : '';

    return (
      <>
        <Button onClick={changeVisibility}>
          <Box
            // className={classes.circle}
            style={{
              background: options.variant.backgroundColor,
              borderColor: options.variant.borderColor,
              boxShadow: options.variant.boxShadow,
            }}
          />
          {text}
        </Button>
        <Box>
        </Box>
      </>
    );
  }
}

export default NodeSelection;
