import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Main from '../Main';

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Main />
    </Box>
  );
};

export default Layout;
