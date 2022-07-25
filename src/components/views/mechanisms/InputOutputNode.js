import * as React from "react";
import { withStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

const styles = () => ({
  card: {
    padding: '0.625rem 0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    display: 'flex',
    alignItems: 'center',

    '&:first-child': {
      borderTopLeftRadius: '0.625rem',
      borderTopRightRadius: '0.625rem',
    },

    '&:last-child': {
      borderBottomLeftRadius: '0.625rem',
      borderBottomRightRadius: '0.625rem',
    },

    '&:not(:last-child)': {
      marginBottom: '0.0625rem'
    },
  },

  bullet: {
    width: '1rem',
    height: '1rem',
    border: 'solid 0.0625rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mr8: {
    marginRight: '0.5rem',
  },

  ml8: {
    marginLeft: '0.5rem',
  },

  dot: {
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '50%',
  },

  contentRight: {
    justifyContent: 'flex-end',
    '& .MuiTypography-root': {
      order: 1,
    },

    '& > .MuiBox-root': {
      order: 2
    },
  },

});


class InputOutputNode extends React.Component {
  render() {
    const { classes, variant, text, direction } = this.props;
    return (
      <Box className={`${classes.card} ${direction === 'right' && classes.contentRight}`}>
        <Box
          className={`${classes.bullet} ${direction === "right" ? classes.ml8 : classes.mr8}`}
          style={{
            background: variant.backgroundColor,
            borderColor: variant.bulletColor,
          }}
        >
          <Box
            className={classes.dot}
            style={{
              background: variant.bulletColor,
            }}
          />
        </Box>
        <Typography>{text}</Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(InputOutputNode);
