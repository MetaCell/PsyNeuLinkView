import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Typography, LinearProgress } from '@mui/material';
import vars from "../../assets/styles/variables";

const { listSelectedTextColor, overlayColor } = vars;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    background: overlayColor,
    width: '100%',
    height: '100%',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  wrap: {
    width: '17.625rem',
    background: 'rgba(250, 250, 250, 0.93)',
    boxShadow: '0 0.5rem 4rem rgba(0, 0, 0, 0.1)',
    borderRadius: '0.875rem',
    textAlign: 'center',
    padding: '2.25rem 2rem',

    '& .MuiLinearProgress-root': {
      marginTop: '1.875rem',
    },

    '& h3': {
      fontWeight: 600,
      fontSize: '1.25rem',
      marginBottom: '0.5rem',
      lineHeight: '1.5rem',
      color: listSelectedTextColor
    },

    '& p': {
      color: 'rgba(60, 60, 67, 0.6)',
      letterSpacing: '-0.005rem',
      fontWeight: 500,
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
    },
  },
}))

const Loader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.wrap}>
        <Typography variant='h3'>Loading...</Typography>
        <Typography>Please wait while we’re loading the visualization of your file.</Typography>
        <LinearProgress />
      </Box>
    </Box>
  )
};

export default Loader;