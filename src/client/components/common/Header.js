import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { GUIViews } from '../../../constants';
import vars from '../../assets/styles/variables';
import PSYLOGO from '../../assets/svg/new-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeView } from '../../redux/actions/general';
import { CustomBreadcrumbsWithMenu } from './Breadcrumbs';
import { Button, Chip, List, ListItemButton, Typography } from '@mui/material';


const {
  textWhite,
  listSelectedTextColor,
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
    position: 'relative',
    zIndex: 9999,
  },

  leftSection: {
    flexBasis: 0,
    flexGrow: 1,
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

      '&:hover': {
        background: 'transparent',
      },
    },
  },

  middleSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightSection: {
    flexBasis: 0,
    flexGrow: 1,
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

const listItems = [
  { label: 'Build', value: 'build', soon: false, action: GUIViews.EDIT},
  { label: 'Visualise', value: 'visualise', soon: false, action: GUIViews.VIEW},
];

const Header = ({openRunModalDialog}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState('build');

  const viewState = useSelector(state => state.general.viewState);

  const handleClick = (event, value, action) => {
    if (viewState !== action && value !== selected) {
      setSelected(value);
      dispatch(changeView(action));
    }
  };

  return (
    <>
      <Box className={classes.root} sx={{zIndex: '1 !important'}}>
        <Box className={classes.leftSection}>
          <img src={PSYLOGO} alt="new-logo" aria-describedby="logo" />
          <CustomBreadcrumbsWithMenu />
        </Box>
        <Box className={classes.middleSection}>
          <List className="headerSwitch" component="nav">
            {listItems.map((item, idx) => {
              return (
                <ListItemButton
                  key={idx}
                  selected={item.value === selected}
                  disableRipple
                  disabled={item.soon}
                  onClick={(e) => handleClick(e, item.value, item.action)}
                >
                  <Typography>{item.label}</Typography>
                  {item.soon && <Chip label="SOON" />}
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Box className={classes.rightSection}>
          <Button
            variant="contained"
            onClick={openRunModalDialog}>
            Run
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;
