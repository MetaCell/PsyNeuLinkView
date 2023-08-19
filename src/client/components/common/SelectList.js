import { FilledInput, FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { string, node } from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-filled': {
      paddingTop: 'none !important',
      background: 'white',
      '& .MuiFilledInput-root': {
        background: 'white',
      },
    },
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
    '& .MuiInputBase-root': {
      borderRadius: theme.spacing(1),
      '& .css-1gzkxga-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input':
        {
          borderRadius: theme.spacing(1),
          boxShadow:
            ' 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)',
          paddingTop: '0.375rem',
          paddingBottom: '0.375rem',
          paddingLeft: '0.5rem',
        },
    },
    '& .MuiInputBase-root:hover': {
      content: 'none',
    },
    '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
      borderBottom: 'none',
      content: 'none',
    },
  },
  filter: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      padding: 0,
      borderRadius: '0.75rem',
    },
  },
};

const FilterSelect = ({ labelId, id, label, children, ...props }) => {
  const classes = useStyles();

  return (
    <FormControl classes={{ root: classes.root }} variant="filled" fullWidth>
      <InputLabel id={labelId} classes={classes.label}>
        {label}
      </InputLabel>
      <Select
        size="small"
        label={label}
        labelId={labelId}
        input={<FilledInput classes={{ root: classes.root }} />}
        IconComponent={(props) => (
          <ExpandMoreRoundedIcon {...props} fontSize="inherit" />
        )}
        MenuProps={MenuProps}
        {...props}
      >
        {children}
      </Select>
    </FormControl>
  );
};

FilterSelect.propTypes = {
  id: string,
  labelId: string,
  label: string,
  children: node,
};

export default FilterSelect;
