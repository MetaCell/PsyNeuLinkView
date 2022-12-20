import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  }
}))

// add left sidebar and layout manager
const MainVisualise = ({ children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
        This is the view where to instantiate the layout manager
    </Box>
  );
};

export default MainVisualise;
