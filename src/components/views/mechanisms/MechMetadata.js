import * as React from "react";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import NodeSelection from "./NodeSelection";
import InputOutputNode from "./InputOutputNode";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";

const styles = () => ({
  root: {
    position: 'relative',
    width: '18rem',
    borderRadius: '0.875rem',
    border: 'solid 0.0625rem',
    padding: '0.5rem',

    '& .MuiTypography-root': {
      fontWeight: '500',
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.005rem',
      margin: 0,
    },

    '& label': {
      display: 'block',
      fontWeight: 400,
      fontSize: '0.625rem',
      lineHeight: '0.625rem',
      letterSpacing: '-0.005rem',
      color: '#76787D',
      textTransform: 'uppercase'
    },
  },

  header: {
    marginBottom: '0.25rem',
    padding: '0.75rem 0',

    '& img': {
      display: 'block',
      margin: '0 auto 0.25rem',
    },

    '& p': {
      textAlign: 'center',
    },
  },

  block: {
  },

  cardSecondary: {
    background: '#FFFFFF',
    padding: '0.5rem',
    width: 'calc((100% - 0.125rem) / 3)',

    '&:first-child': {
      borderTopLeftRadius: '0.625rem',
    },

    '&:nth-child(3)': {
      borderTopRightRadius: '0.625rem',
    },

    '&:last-child': {
      width: '100%',
      borderBottomLeftRadius: '0.625rem',
      borderBottomRightRadius: '0.625rem',
    },
  },

  separator: {
    width: '0.125rem',
    height: '1rem',
    borderRadius: '1.25rem',
    margin: '0.25rem auto'
  },

  function: {
    '&.MuiTypography-root': {
      marginTop: '0.25rem',
      fontFamily: "'Roboto Mono', monospace",
    },
  },
});

class MechMetadata extends React.Component {
  render() {
    const { classes, model, model: { options }, engine, changeVisibility } = this.props;
    const functionValues = (label, value) => (
      <Box className={classes.cardSecondary}>
        <Typography component="label">{label}</Typography>
        <TextField
          id="outlined-multiline-flexible"
          maxRows={4}
          value={value}
          onChange={ (e) => {console.log(e)} }
          variant="outlined"
          style={{ zIndex: 11 }}
        />
        {/* <Typography>{value}</Typography> */}
      </Box>
    )
    return (
      <>
        {options.selected && (
          <NodeSelection node={model} engine={engine} text={"Hide properties"} changeVisibility={changeVisibility} />
        )}
        <Box
          className={classes.root}
          style={{
            background: options?.variant.backgroundColor,
            borderColor: options?.variant.borderColor,
            boxShadow: options?.variant.boxShadow,
          }}
        >
          <Box className={classes.header}>
            <img src={options.icon} alt="mechanism" />
            <Typography component="p" style={{ color: options?.variant.textColor }}>
              {options.name}
            </Typography>
          </Box>

          <Box className={classes.block}>
            <InputOutputNode variant={options?.variant} text={"Input from Frame 1"} />
            <InputOutputNode variant={options?.variant} text={"Input from Frame 2"} direction="right" />
          </Box>

          <Box
            className={classes.separator}
            style={{
              background: options?.variant.borderColor,
            }}
          />

          <Box className={classes.block}>
            <Box display="flex" flexWrap="wrap" gap="0.0625rem">
              {
                functionValues('Context', '12')
              }
              {
                functionValues('Size', '8.90')
              }
              {
                functionValues('Prefs', '44')
              }
              <Box className={classes.cardSecondary}>
                <Typography component="label">Function</Typography>
                <Typography className={classes.function}><Typography component="strong" style={{ color: '#4579EE' }}>function</Typography>=pnl.<Typography style={{ color: '#ED745D' }} component="strong">Logistic</Typography>(gain=1.0, bias=-4)</Typography>
              </Box>
            </Box>

          </Box>

          <Box
            className={classes.separator}
            style={{
              background: options?.variant.borderColor,
            }}
          />

          <Box className={classes.block}>
            <InputOutputNode variant={options?.variant} text={"Output from Frame 1"} />
            <InputOutputNode variant={options?.variant} text={"Output from Frame 1"} direction="right" />
          </Box>
        </Box>
      </>
    );
  }
}

export default withStyles(styles)(MechMetadata);
