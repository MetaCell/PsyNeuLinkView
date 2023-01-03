import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import { datasets } from './dataset';
import InstancesTreeView from './TreeView/InstanceTreeView';

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
          zIndex: 1301,
        },
      }}
    >
      {renderContent()}
    </Drawer>
  );
};
