import React from 'react';
import MainEdit from '../views/editView/MainEdit';
import Visualize from '../views/visualiseView/Visualize';
import Header from './Header';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { GUIViews } from '../../../constants';

const Layout = ({ children }) => {
  const viewState = useSelector((state) => state.general.guiView);

  return (
    <>
      {viewState === GUIViews.EDIT ? (
        <Box>
          <Header />
          <MainEdit />
        </Box>
      ) : (
        <Box>
          <Header />
          <Visualize />
        </Box>
      )}
    </>
  );
};

export default Layout;
