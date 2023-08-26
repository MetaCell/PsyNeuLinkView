import { Box, IconButton, Popover, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import vars from '../../assets/styles/variables';

const { listItemActiveBg, dialogBorderColor, optionTextColor } = vars;

const useStyles = makeStyles(() => ({
  action: {
    width: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      color: optionTextColor,
      fontWeight: 500,
      padding: '0.5rem',
    },

    '& .MuiIconButton-root': {
      borderRadius: '0.25rem',
      borderWidth: '0.125rem',
      borderStyle: 'solid',
      borderColor: (props) =>
        props.anchorEl ? listItemActiveBg : 'transparent',
      backgroundColor: (props) =>
        props.anchorEl ? dialogBorderColor : 'transparent',
      '&:focus, &:hover': {
        borderColor: listItemActiveBg,
      },
    },
  },
}));

export const MenuPopover = ({ label, icon, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles({ anchorEl });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'menu-popover' : undefined;

  return (
    <>
      <Box className={classes.action} aria-describedby={id}>
        <Box>
          <Typography>{label}</Typography>
        </Box>
        <IconButton onClick={handleClick}>{icon}</IconButton>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </>
  );
};
