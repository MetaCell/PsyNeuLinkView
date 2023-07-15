import React from 'react';
import PropTypes from 'prop-types';
import { UnionIcon } from './icons';
import { makeStyles } from '@mui/styles';
import vars from '../../../../assets/styles/variables';
import { CustomCheckbox } from '../../../common/Checkbox';
import { Box, MenuItem, Typography } from '@mui/material';
import { MenuPopover } from '../../../common/MenuPopover';
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

const AddToVisualMenu = ({ options, onChange }) => {
  const [optionsValue, updateOptions] = React.useState(() => options);
  const classes = useStyles();
  const loggables = [];
  for (var prop in options) {
    if (Object.prototype.hasOwnProperty.call(optionsValue, prop)) {
      loggables.push({value: options[prop], label: prop});
    }
}
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
          {loggables.map((loggable) => {
            const selected = loggable.value === 'OFF' ? false : true;
            return (
              <MenuItem
                key={loggable.label}
                selected={selected}
                className={classes.menuItem}
                onClick={() => {
                  if (loggable.value === 'OFF') {
                    onChange({
                      key: loggable.label,
                      value: 'EXECUTE',
                    })
                    updateOptions({
                      ...optionsValue,
                      [loggable.label]: 'EXECUTE',
                    });
                  } else {
                    onChange({
                      key: loggable.label,
                      value: 'OFF',
                    })
                    updateOptions({
                      ...optionsValue,
                      [loggable.label]: 'OFF',
                    });
                  }
                }}
              >
                <CustomCheckbox checked={selected} />
                <Typography fontSize={14}>{loggable.label}</Typography>
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
