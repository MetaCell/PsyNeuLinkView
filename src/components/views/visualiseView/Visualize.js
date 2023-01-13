import React from 'react';
import { makeStyles } from '@mui/styles';
import MainLayout from '../../../layout/visualise/main';
import Sidebar from './sidebar/sidebar';
import { properties } from './sidebar/mock/properties';
import VisualizeLayout from './Layout';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MainVisualize = ({ children }) => {
  const classes = useStyles();
  return (
    <MainLayout sidebar={<Sidebar properties={properties} />}>
      <VisualizeLayout />
    </MainLayout>
  );
};

export default MainVisualize;
