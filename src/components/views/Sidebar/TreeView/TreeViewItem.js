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
      paddingLeft: '0.313rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      '&:hover': {
        backgroundColor: 'white',
        borderRadius: '0.5rem',

        borderColor: theme.palette.primary.main,
      },
      '&.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, ${alpha(
          theme.palette.primary.main,
          0.1
        )})`,
        color: 'var(--tree-view-color)',

        [`& + .${treeItemClasses.group}`]: {
          marginLeft: 0,
          backgroundColor: alpha(theme.palette.primary.main, 0.03),
          [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(4),
          },
        },
      },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      // adjust margin it nest list spacing isn't consistent
      marginLeft: 0,
      // marginLeft: 0,
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(3),
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
          paddingY={1}
          onClick={(event) => {
            onNodeSelect(event, props.nodeId);
            event.preventDefault();
          }}
          onMouseOver={() => setTarget(true)}
          onMouseLeave={() => setTarget(false)}
        >
          {LabelIcon && (
            <Box flexShrink={0}>
              {cloneElement(LabelIcon, {
                color: selected ? '#000' : 'rgba(143, 143, 143, 1)',
              })}
            </Box>
          )}
          <Typography variant="body2" flex={1} noWrap>
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
