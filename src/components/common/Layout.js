import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from '../Sidebar';
import Main from '../Main';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      {/* <Sidebar /> */}
      <Main />
    </Box>
  )
};

export default Layout;