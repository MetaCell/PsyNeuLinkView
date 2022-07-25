import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import Header from './Header';
import Main from '../Main';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Main />
    </Box>
  )
};

export default Layout;