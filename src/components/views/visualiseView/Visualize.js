import React from 'react';
import MainLayout from '../../../layout/visualise/main';
import Sidebar from './sidebar/sidebar';
import { properties } from './sidebar/mock/properties';
import VisualizeLayout from './VisualizeLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Visualize = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout sidebar={<Sidebar properties={properties} />}>
        <VisualizeLayout />
      </MainLayout>
    </DndProvider>
  );
};

export default Visualize;
