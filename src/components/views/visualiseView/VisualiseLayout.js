import React, { useEffect, useState } from 'react';
import { getLayoutManagerInstance } from '@metacell/geppetto-meta-client/common/layout/LayoutManager';
import { useStore } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '@metacell/geppetto-meta-ui/flex-layout/style/light.scss';

const useStyles = makeStyles({
  layoutContainer: {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 54px)',
    '&> div': {
      height: '100%',
    },
  },
});

/**
 * The component that renders the FlexLayout component of the LayoutManager.
 */
const VisualiseLayout = () => {
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
        setComponent(myManager.getComponent());
      }
    }
  }, [Component, store]);

  return (
    <div className={classes.layoutContainer}>
      {Component === undefined ? <CircularProgress /> : <Component />}
    </div>
  );
};

export default VisualiseLayout;
