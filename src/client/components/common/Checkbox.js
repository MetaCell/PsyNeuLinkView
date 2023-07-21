import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import vars from '../../assets/styles/variables';
import { makeStyles } from '@mui/styles';

const {
  listItemActiveBg,
  progressBar,
  primaryBg,
  textWhite,
  dividerColor,
  disabledButtonBG,
} = vars;

const useStyles = makeStyles(() => ({
  root: {
    height: '1rem',
    '&:hover': { bgcolor: 'transparent' },
  },
}));

const Icon = styled('span')(({ theme }) => ({
  borderRadius: '0.25rem',
  borderColor: listItemActiveBg,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1rem',
  height: '1rem',
  textAlign: 'center',
  boxShadow:
    'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: textWhite,
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: `2px auto ${progressBar}`,
    outlineOffset: 2,
  },
  '.Mui-checked &': {
    boxShadow: `inset 0 0 0 1px ${listItemActiveBg}, inset 0 -1px 0 ${disabledButtonBG}`,
  },
  'input:hover ~ &': {
    backgroundColor: primaryBg,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: dividerColor,
  },
}));

const CheckedIcon = styled(Icon)({
  backgroundColor: `${listItemActiveBg}10`,
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: '0.75rem',
    height: '0.75rem',
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath" +
      " d='M4.39754 7.93746L2.31254 5.85246L1.60254 6.55746L4.39754 9.35246L10.3975 " +
      "3.35246L9.69254 2.64746L4.39754 7.93746Z' fill='%23007AFF'/%3e%3c/svg%3e\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: `${listItemActiveBg}30`,
  },
});

// Inspired by blueprintjs
export function CustomCheckbox(props) {
  const classes = useStyles();
  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      inputProps={{ 'aria-label': 'Custom Checkbox' }}
      {...props}
    />
  );
}
