import React, { useEffect, useState } from 'react';
import { getLayoutManagerInstance } from '@metacell/geppetto-meta-client/common/layout/LayoutManager';
import { addWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { useDispatch, useStore } from 'react-redux';
import { CircularProgress, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '@metacell/geppetto-meta-ui/flex-layout/style/light.scss';
import { CloseIcon, MaximizeIcon, PlusIcon } from './icons/layoutIcons';
import { DroppableChartWidget } from '../../../layout/widgets';
import { v4 as uuidv4 } from 'uuid';
import vars from '../../../assets/styles/variables';

const { elementTextColor, breadcrumbTextColor } = vars;

const useStyles = makeStyles({
  layoutContainer: {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 4.375rem)',
    '&> div': {
      height: '100%',
    },
  },
  iconButton: {
    color: elementTextColor,

    '&:hover': {
      color: breadcrumbTextColor,
      background: 'none',
    },
  },
});

/**
 * The layout properties extends the FlexLayout component addons and configs.
 */
const layoutProps = {
  // custom layout icons map for: close, maximize, restore, more, popout
  icons: {
    close: <CloseIcon />,
    maximize: <MaximizeIcon />,
  },
  tabSetButtons: [
    ({ panel }) => {
      const dispatch = useDispatch();
      const classes = useStyles();
      const tabSetId = panel.getId();

      const selected = panel.getSelected();
      function addTabToTabSet(panel) {
        const childrenLength = panel._children.length;

        if (!!tabSetId) {
          dispatch(
            addWidget({
              ...DroppableChartWidget,
              id: uuidv4(),
              panelName: tabSetId,
              pos:
                selected === undefined || (selected <= 0 && childrenLength <= 0)
                  ? 0
                  : childrenLength,
            })
          );
        }
      }

      return (
        <IconButton
          key={tabSetId}
          color="gray"
          className={classes.iconButton}
          onClick={() => {
            // console.log('config', panel.getParent(), selected, panel);
            console.log('panel', panel);
            addTabToTabSet(panel);
          }}
        >
          <PlusIcon />
        </IconButton>
      );
    },
  ],
};

/**
 * The component that renders the FlexLayout component of the LayoutManager.
 */
const VisualizeLayout = () => {
  const classes = useStyles();
  const store = useStore();
  const [Component, setComponent] = useState(undefined);

  useEffect(() => {
    // Workaround because getLayoutManagerInstance
    // is undefined when calling it in global scope
    // Need to wait until store is ready ...
    // TODO: find better way to retrieve the LayoutManager component!
    if (Component === undefined) {
      const myManager = getLayoutManagerInstance();

      if (myManager) {
        myManager.enableMinimize = true;
        setComponent(myManager.getComponent(layoutProps));
      }
    }
  }, [Component, store]);

  return (
    <div className={classes.layoutContainer}>
      {Component === undefined ? <CircularProgress /> : <Component />}
    </div>
  );
};

export default VisualizeLayout;
