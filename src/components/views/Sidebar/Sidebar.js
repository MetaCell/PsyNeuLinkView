import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import InstancesTreeView from './TreeView/InstanceTreeView';

export const COMPOSITION_DTO =   {
  id: uuidv4(),
  label: 'Composition 2',
  type: 'CombinationFunction',
  detail: 'CombinationFunction Detailing',
  info: {
    title: 'function',
    pnl: '   =pnl.',
    sub: 'Logistic',
    calc: '(gain=1.0, bias=-4)'
  },
  stats: [
    {label:'Pertinencity', value: '12' },
    {label:'Prosistensy', value: '8.90' }
  ]
};

const COMPOSITION_EXAMPLE =   {
  id: uuidv4(),
  label: 'Composition 2',
  tooltip: 'Composition 2',
  type: 'composition',
  items: [
    {
      id: uuidv4(),
      label: 'A2',
      tooltip: 'Stimulus',
      type: 'mechanism',
    },
    {
      id: uuidv4(),
      label: 'Projection A2 -->  B2 Projection A2 -->  B2',
      tooltip: 'Projection A2 --> B2',
      type: 'projection',
    },
    {
      id: uuidv4(),
      label: 'B2',
      tooltip: 'Stimulus',
      type: 'mechanism',
    },
  ],
};

const datasets = [
  {
    id: uuidv4(),
    label: 'Stimulus',
    tooltip: 'Stimulus',
    type: 'mechanism',
  },
  {
    id: uuidv4(),
    label: 'Projection Stimulus --> Composition',
    tooltip: 'Projection Stimulus --> Composition',
    type: 'projection',
  },
  {
    id: uuidv4(),
    label: 'Composition 1 Composition 1Composition 1',
    tooltip: 'Composition 1',
    type: 'composition',
    items: [
      {
        id: uuidv4(),
        label: 'A1',
        tooltip: 'Stimulus',
        type: 'mechanism',
      },
      {
        id: uuidv4(),
        label: 'Projection A1 -->  B1',
        tooltip: 'Projection A1 --> B1',
        type: 'projection',
      },
      {
        id: uuidv4(),
        label: 'B1',
        tooltip: 'Stimulus',
        type: 'mechanism',
        items: [
          {
            id: uuidv4(),
            label: 'A1',
            tooltip: 'Stimulus',
            type: 'mechanism',
          },
          {
            id: uuidv4(),
            label: 'Projection A1 -->  B1',
            tooltip: 'Projection A1 --> B1',
            type: 'projection',
          },
          {
            id: uuidv4(),
            label: 'B1',
            tooltip: 'Stimulus',
            type: 'mechanism',
          },
        ],
      },
    ],
  },  
  COMPOSITION_EXAMPLE
];

const sidebarOpened = true;

export const Sidebar = (props) => {
  const { expand, setExpand, searchTerm } = props;

  const renderContent = () => {
    if (datasets?.length > 0) {
      return (
        <>
          <Box px={2} paddingY={1.5}>
            <Typography fontSize={14} fontWeight={500}>
              Model Hierarchy
            </Typography>
          </Box>
          <InstancesTreeView datasets={datasets} />
        </>
      );
    } else {
      return (
        <>
          <Typography className="no-instance">
            No instances to display yet.
          </Typography>
        </>
      );
    }
  };
  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={sidebarOpened}
      PaperProps={{
        sx: {
          width: '250px',
          padding: 0,
          borderRadius: 0,
          backgroundColor: 'white',
        },
      }}
    >
      {renderContent()}
    </Drawer>
  );
};
