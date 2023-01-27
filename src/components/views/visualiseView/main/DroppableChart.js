import { Box, Snackbar } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import vars from '../../../../assets/styles/variables';

const { elementBorderColor, dropdownBorderColor } = vars;

export const DroppableChart = ({ model, accept = 'element' }) => {
  const dispatch = useDispatch();

  const watchModel = useMemo(() => model, [model]);

  const onDrop = useCallback(
    (item) => {
      console.log(item, 'items');

      // dispatch(
      //   updateWidget({
      //     ...SimpleComponentWidget,
      //     props: {
      //       ...SimpleComponentWidget.props,
      //       model: [...model, item],
      //     },
      //   })
      // );
    },
    [model, dispatch]
  );

  const checkCanDrop = useCallback(
    (item) => {
      return !watchModel?.some((ele) => ele.id === item.id);
    },
    [watchModel]
  );

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept,
    canDrop: checkCanDrop,
    drop: ondrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;
  const inActive = isOver && !canDrop;
  let backgroundColor = elementBorderColor;
  if (isActive) {
    backgroundColor = 'rgba(118, 118, 128, 0.12)';
  } else if (canDrop) {
    backgroundColor = dropdownBorderColor;
  }

  return (
    <Box ref={dropRef} style={{ backgroundColor, height: '100%' }}>
      Simple component
      {watchModel && watchModel.length > 0
        ? watchModel.map((ele) => <Box key={ele.id}>{ele.name}</Box>)
        : null}
      {inActive && (
        <Snackbar
          autoHideDuration={6000}
          open={inActive}
          message="Model already exist in chart"
        />
      )}
    </Box>
  );
};
