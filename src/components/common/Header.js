import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Button, Chip, List, ListItemButton, Typography } from '@mui/material';
import PSYLOGO from '../../assets/svg/new-logo.svg';
import vars from '../../assets/styles/variables';
import { CustomBreadcrumbsWithMenu } from './Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import UndoIcon from '@mui/icons-material/Undo';

const {
  textWhite,
  listSelectedTextColor,
  breadcrumbTextColor,
  dialogBorderColor,
  headerBorderColor,
} = vars;

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? 'composition-popper' : undefined;

  return (
    <>
      <Dialog
        id={id}
        open={open}
        hideBackdrop
        PaperProps={{
          sx: {
            position: 'fixed',
            top: 96,
            left: 60,
            width: 'calc(100VW - 24.25rem)',
            maxWidth: 'calc(100VW - 24.25rem)',
            height: 'calc(100Vh - 11rem)',
            border: `2px solid ${dialogBorderColor}`,
            background: headerBorderColor,
            borderRadius: '0.75rem',
            m: 0,
          },
        }}
        aria-labelledby="composition-popper"
      >
        <Typography>Composition 2</Typography>
      </Dialog>
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

            {/* modal button TODO remover later */}
            <ListItemButton disableRipple onClick={handleClick}>
              <Typography>Composition</Typography>
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
      {open && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '1rem',
            left: 'calc(50% - 153px/2 + 0.5px)',
            zIndex: 9999,
          }}
        >
          <Button
            startIcon={<UndoIcon fontSize="small" />}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: breadcrumbTextColor,
              '&:hover': {
                backgroundColor: listSelectedTextColor,
              },
            }}
            onClick={handleClose}
          >
            Return to parent
          </Button>
        </Box>
      )}
    </>
  );
};

export default Header;
