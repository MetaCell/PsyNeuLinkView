import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Button, Chip, List, ListItemButton, Typography } from '@mui/material';
import PSYLOGO from '../../assets/svg/new-logo.svg';
import vars from '../../assets/styles/variables';
import { CustomBreadcrumbsWithMenu } from './Breadcrumbs';

const { textWhite, listSelectedTextColor, headerBorderColor } = vars;

const useStyles = makeStyles(() => ({
  root: {
    background: textWhite,
    height: '3.375rem',
    padding: '0.5rem 0.625rem 0.5rem 0.625rem ',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${headerBorderColor}`,
    inset: '1rem auto auto 0 !important',
  },

  leftSection: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: '1rem',
      marginLeft: 0,
    },

    '& .MuiButton-root': {
      padding: 0,
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      color: listSelectedTextColor,
      // '& img': {
      //   marginRight: 0,
      //   marginLeft: 0,
      // },

      '&:hover': {
        background: 'transparent',
      },
    },
  },

  middleSection: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightSection: {
    width: '20.625rem',
    display: 'flex',
    justifyContent: 'flex-end',
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
}));

const breadcrumbs = [
  { id: 'home', text: 'Home' },
  { id: 'breadSubItem1', text: 'breadSubItem1' },
  { id: 'breadSubItem2', text: 'breadSubItem2' },
  { id: 'breadSubItem3', text: 'breadSubItem3' },
  { id: 'breadSubItem4', text: 'breadSubItem4' },
  { id: 'breadSubItem5', text: 'breadSubItem5' },
  { id: 'breadSubItem6', text: 'breadSubItem6' },
  { id: 'breadSubItem7', text: 'breadSubItem7' },
  { id: 'composition2', text: 'Composition 2' },
];

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.leftSection}>
        <img src={PSYLOGO} alt="new-logo" aria-describedby="logo" />

        <CustomBreadcrumbsWithMenu breadcrumbs={breadcrumbs} />
      </Box>
      <Box className={classes.middleSection}>
        <List className="headerSwitch" component="nav">
          <ListItemButton disableRipple selected>
            <Typography>Build</Typography>
          </ListItemButton>
          <ListItemButton disableRipple disabled>
            <Typography>Test</Typography>
            <Chip label="SOON" />
          </ListItemButton>
        </List>
      </Box>
      <Box className={classes.rightSection}>
        <Button disabled disableElevation variant="contained">
          Share
          <Chip label="SOON" color="primary" />
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
