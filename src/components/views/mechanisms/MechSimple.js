import * as React from "react";
import { withStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import NodeSelection from "./NodeSelection";
import { PortWidget } from "@projectstorm/react-diagrams";

const styles = () => ({
  root: {
    border: 'solid 0.0625rem',
    borderRadius: '50%',
    width: '10rem',
    height: '10rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',

    '& img': {
      marginBottom: '0.25rem',
    },

    '& p': {
      fontWeight: 500,
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.005rem',
      margin: 0,
    },
  },
});

class MechSimple extends React.Component {
  render() {
    const { classes, model, model: { options }, engine, changeVisibility } = this.props;

    const circlePortStyle = {
      width: "12px",
      height: "12px",
      margin: "2px",
      borderRadius: "4px",
      background: "darkgray",
      cursor: "pointer",
    }

    return (
      <Box position='relative'>
        {options.selected && (
          <NodeSelection node={model} engine={engine} text={"Show properties"} changeVisibility={changeVisibility} />
        )}

        <PortWidget
            style={{position: 'absolute', top: '46%', left: '0px'}}
            engine={engine}
            port={model.getPort("in")}
        >
            <div style={circlePortStyle}/>
        </PortWidget>
        <PortWidget
            style={{position: 'absolute', top: '46%', right: '0px'}}
            engine={this.props.engine}
            port={model.getPort("out")}
        >
            <div style={circlePortStyle}/>
        </PortWidget>
        <Box
          className={classes.root}
          style={{
            background: options.variant.backgroundColor,
            borderColor: options.variant.borderColor,
            boxShadow: options.variant.boxShadow,
          }}
        >
          <img src={options.icon} alt="mechanism" />
          <Typography component="p" style={{ color: options.variant.textColor }}>
            {options.name}
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(MechSimple);
