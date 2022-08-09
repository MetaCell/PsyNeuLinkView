import React from 'react';
 import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Button, Chip, List, ListItemButton, Typography, Popper, IconButton, Switch } from '@mui/material';
import PLAY from "../../assets/svg/play.svg";
import DOWN from "../../assets/svg/dropdown.svg";
import LOGO from "../../assets/svg/logo.svg";
import INFO from "../../assets/svg/info.svg";
import vars from "../../assets/styles/variables";

const { textWhite, listSelectedTextColor, dropdownBg, dropdownTextColor } = vars;

const useStyles = makeStyles(() => ({
  root: {
    background: textWhite,
    height: '3.5rem',
    padding: '0 0.625rem 0 1.5rem',
    display: 'flex',
    alignItems: 'center',
  },

  leftSection: {
    width: '20.625rem',
    '& .MuiButton-root': {
      padding: 0,
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      color: listSelectedTextColor,
      '& img': {
        marginRight: 0,
        marginLeft: '0.5rem',
      },

      '&:hover': {
        background: 'transparent'
      },
    },
  },

  middleSection: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  rightSection: {
    width: '20.625rem',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  dropDown: {
    width: '17.5rem',
    background: dropdownBg,
    boxShadow: '0 0.25rem 2.5rem rgba(0, 0, 0, 0.1), 0 1rem 7.5rem rgba(60, 60, 67, 0.2)',
    padding: '0.5rem',
    borderRadius: '0.75rem',
    inset: '1rem auto auto 0 !important',

    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 1rem 1rem 1rem',
      borderColor: `transparent transparent ${dropdownBg} transparent`,
      position: 'absolute',
      top: '-1rem',
      // right: 0,
      // left: 0,
      // margin: '0 auto',
      left: '2rem'
    },
  },

  dropDownHeader: {
    padding: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',

    '& .MuiBox-root': {
      width: 'calc(100% - 2.625rem)',
      paddingLeft: '0.5rem',

      '& strong': {
        display: 'block',
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        color: listSelectedTextColor,
      },

      '& span': {
        display: 'block',
        fontWeight: 500,
        fontSize: '0.8125rem',
        lineHeight: '1rem',
        letterSpacing: '-0.005rem',
        color: dropdownTextColor,
      },
    },
  },

  card: {
    background: textWhite,
    backgroundBlendMode: 'luminosity',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0.75rem',

    '&:not(:last-child)': {
       marginBottom: '0.5rem',
    },

    '& .MuiIconButton-root': {
      padding: 0,
    },

    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.005rem',
      color: listSelectedTextColor,
    },
  },
}))

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const id = open ? 'simple-popper' : undefined;

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box className={classes.root}>
      <Box className={classes.leftSection}>
        <Button
          disableRipple
          aria-describedby={id}
          onClick={handleClick}
        >
          model12.py
          <img src={DOWN} alt="down" />
        </Button>

        <Popper id={id} open={open} className={classes.dropDown} anchorEl={anchorEl} placement='bottom-start'>
          <Box className={classes.dropDownHeader}>
            <img src={LOGO} alt="logo" />
            <Box>
              <Typography component="strong">model12.py</Typography>
              <Typography component="span">PsyNeuLink View</Typography>
            </Box>
          </Box>

          <Box className={classes.card}>
            <Typography>Background dotted grid</Typography>
            <Switch {...label} defaultChecked />
          </Box>

          <Box className={classes.card}>
            <Typography>About Psyneulink</Typography>
             <IconButton disableRipple><img src={INFO} alt="info" /></IconButton>
          </Box>
        </Popper>
        {/* <Typography>New visualization</Typography> */}
      </Box>
      <Box className={classes.middleSection}>
        <List className="customSwitch" component="nav">
          <ListItemButton disableRipple selected>
            <Typography>Construct</Typography>
          </ListItemButton>
          <ListItemButton disableRipple disabled>
            <Typography>Visualize</Typography>
            <Chip label="SOON" />
          </ListItemButton>
        </List>
      </Box>
      <Box className={classes.rightSection}>
        <Button disabled disableElevation variant="contained">
          <img src={PLAY} alt="Run-selection" />
          Run selection
          <Chip label="SOON" color='primary' />
        </Button>
      </Box>
    </Box>
  );
};

export default Header;