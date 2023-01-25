import React from 'react';
import { makeStyles } from '@mui/styles';
import MainLayout from '../../../layout/visualise/main';
import Sidebar from './sidebar/sidebar';
import { properties } from './sidebar/mock/properties';
import VisualizeLayout from './VisualizeLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Visualize = ({ children }) => {
  const classes = useStyles();
  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout sidebar={<Sidebar properties={properties} />}>
        <VisualizeLayout />
      </MainLayout>
    </DndProvider>
  );
};

export default Visualize;
