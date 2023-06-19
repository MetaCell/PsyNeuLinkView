import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Box, Typography } from '@mui/material';
import { Stack, alpha } from '@mui/system';
import { styled } from '@mui/styles';
import { HiddenIcon, TargetIcon } from './Icons';

const CustomTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.content}`]: {
      borderWidth: '1px',
      height: '2.25rem',
      borderStyle: 'solid',
      borderColor: 'transparent',
      '&:hover': {
        backgroundColor: 'inherit',
        borderRadius: '0.5rem',

        borderColor: theme.palette.primary.main,
      },
      '&.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, ${alpha(
          theme.palette.primary.main,
          0.1
        )})`,
        color: 'var(--tree-view-color)',
      },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.focused}`]: {
      backgroundColor: `var(--tree-view-bg-color, ${alpha(
        theme.palette.primary.main,
        0.03
      )})`,
      color: 'var(--tree-view-color)',
    },
  })
);

const StyledTreeItem = (props) => {
  const {
    selected,
    labelText,
    labelIcon: LabelIcon,
    onNodeSelect,
    onShowPanel,
    hidden,
    type,
    ...other
  } = props;

  const [target, setTarget] = React.useState(false);

  return (
    <CustomTreeItem
      label={
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          py={1}
          onClick={(event) => {
            onNodeSelect(event, props.nodeId);
            event.preventDefault();
          }}
          onMouseOver={() => setTarget(true)}
          onMouseLeave={() => setTarget(false)}
        >
          {LabelIcon && (
            <Box flexShrink={0} px={0} py={0}>
              {cloneElement(LabelIcon, {
                color: selected ? '#000' : 'rgba(143, 143, 143, 1)',
              })}
            </Box>
          )}
          <Typography
            fontSize={14}
            lineHeight={1.25}
            letterSpacing="0.005em"
            flex={1}
            noWrap
          >
            {labelText}
          </Typography>
          {hidden && !target ? (
            <HiddenIcon />
          ) : target && !selected ? (
            <TargetIcon />
          ) : null}
        </Stack>
      }
      onContextMenu={(e) => onShowPanel(e, { id: other.nodeId, type })}
      {...other}
    />
  );
};

StyledTreeItem.propTypes = {
  labelIcon: PropTypes.object.isRequired,
  labelText: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

export default StyledTreeItem;
