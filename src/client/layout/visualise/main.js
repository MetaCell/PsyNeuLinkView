import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',

    '& .sidebar': {
      minWidth: '18.75rem',
      maxWidth: '18.75rem',
    },
    '& .main': {
      width: '100%',
      padding: '0.5rem ',
    },
    '& .sidebar, & .main': {
      height: 'calc(100vh - 3.375rem)',
    },
  },
}));

function Main({ sidebar, children }) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className="sidebar">{sidebar}</Box>
      <Box className="main">{children}</Box>
    </Box>
  );
}

export default Main;
