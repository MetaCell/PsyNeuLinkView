import { useSelector } from 'react-redux';
import { Box, Drawer, Typography } from '@mui/material';
import InstancesTreeView from './TreeView/InstanceTreeView';
import ModelSingleton from '../../../../model/ModelSingleton';
import { updateStates } from '../../../../../constants';

const sidebarOpened = true;

export const Sidebar = (props) => {
  const updateState = useSelector(state => state.general.updateState);

  const renderContent = () => {
    const datasets = ModelSingleton.getInstance().getTreeModel();
    if (datasets !== undefined && datasets.length > 0 && updateState === updateStates.UPDATE_DONE) {
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
