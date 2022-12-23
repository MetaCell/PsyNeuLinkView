import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import { string } from 'prop-types';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vars from '../../../../../assets/styles/variables';
import DragIndicatorIcon from '@mui/icons-material/DragIndicatorOutlined';

const {
  elementBgColor,
  elementBorderColor,
  elementPreviewBgColor,
  lighterTextColor,
} = vars;

const useStyles = makeStyles(() => ({
  root: props => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 0.5rem',
    borderRadius: '0.5rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: elementBorderColor,
    backgroundColor: elementBgColor,
    width: '8.094rem',
    height: '3rem',
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.15px',
      color: lighterTextColor,
    },
    '& .MuiBox-root': {
      display: 'flex',
      placeContent: 'center',
      '& svg': {
        cursor: 'grab',
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
  }),
  preview: {
    // width: '6.563rem',
    height: '3rem',
    borderRadius: '0.5rem',
    backgroundColor: elementPreviewBgColor,
    border: `2px solid ${elementPreviewBgColor}`,
  },
}));

function Element(props) {
  const [{ opacity, isDragging }, dragRef, dragPreview] = useDrag(
    () => ({
      type: props.type,
      item: { ...props },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    [props.type, props.name]
  );
  const classes = useStyles();

  return isDragging ? (
    <Box
      ref={dragPreview}
      className={classes.preview}
      style={{ opacity }}
    ></Box>
  ) : (
    <Box
      className={classes.root}
      ref={dragPreview}
      data-testid="droppable-chart"
    >
      <Box role="button" ref={dragRef}>
        <DragIndicatorIcon fontSize="small" />
      </Box>
      <Typography noWrap>{props.name}</Typography>
    </Box>
  );
}

export default memo(Element);

Element.propTypes = {
  id: string.isRequired, // required property
  name: string,
  type: string.isRequired,
};
