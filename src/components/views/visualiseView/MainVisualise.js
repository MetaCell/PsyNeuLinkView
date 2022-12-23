import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import MainLayout from '../../../layout/visualise/main';
import Sidebar from './sidebar/sidebar';
import { properties } from './sidebar/mock/properties';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MainVisualise = ({ children }) => {
  const classes = useStyles();
  return (
    <MainLayout sidebar={<Sidebar properties={properties} />}>
      <Box>This is the view where to instantiate the layout manager</Box>
    </MainLayout>
  );
};

export default MainVisualise;
