import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { MenuPopover } from '../../../common/MenuPopover';
import { Box, MenuItem, Typography } from '@mui/material';
import { UnionIcon } from './icons';
import vars from '../../../../assets/styles/variables';
import { CustomCheckbox } from '../../../common/Checkbox';

const defaultOptions = [
  'Composition 2',
  'Function',
  'Pertinencity',
  'Prosistency',
];

const { optionTextColor } = vars;

const useStyles = makeStyles(() => ({
  header: {
    paddingInline: '1rem',
    paddingTop: '1rem',
    paddingBottom: '0.5rem',
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      color: optionTextColor,
      fontWeight: 500,
    },
  },
  menuItem: {
    padding: '0.25rem',
  },
}));

const AddToVisualMenu = ({ options, value, onChange }) => {
  const classes = useStyles();
  return (
    <Box
      className="block"
      sx={{
        minWidth: '100%',
        zIndex: 1009101,
      }}
    >
      <MenuPopover label="Add to Visualization" icon={<UnionIcon />}>
        <Box className={classes.header}>
          <Typography>Add to Visualization</Typography>
        </Box>
        <>
          {(
            options ?? defaultOptions.map((key) => ({ value: key, label: key }))
          ).map((option) => {
            const selected = value?.includes(option.value);
            return (
              <MenuItem
                key={option.value}
                selected={selected}
                className={classes.menuItem}
                onClick={() => onChange(option.value)}
              >
                <CustomCheckbox checked={selected} />
                <Typography fontSize={14}>{option.label}</Typography>
              </MenuItem>
            );
          })}
        </>
      </MenuPopover>
    </Box>
  );
};

export default AddToVisualMenu;

AddToVisualMenu.propTypes = {
  options: PropTypes.array,
  value: PropTypes.array,
};
