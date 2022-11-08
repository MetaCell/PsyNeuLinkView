import {
  Box,
  IconButton,
  Link,
  MenuItem,
  Popper,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import vars from '../../assets/styles/variables';

const { dropdownSecBg, breadcrumbLinkColor, breadcrumbTextColor } = vars;

const useStyles = makeStyles(() => ({
  crumb: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: `${breadcrumbLinkColor} !important`,
  },
  expand: {
    padding: '0.125rem',
    borderRadius: '0.25rem',
  },
  lastCrumb: {
    display: 'flex',
    alignItems: 'center',
    color: breadcrumbTextColor,

    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      color: 'inherit',
    },
  },
  dropDown: {
    width: '8rem',
    maxWidth: 'content',
    background: dropdownSecBg,
    boxShadow:
      '0 0.25rem 2.5rem rgba(0, 0, 0, 0.1), 0 1rem 7.5rem rgba(60, 60, 67, 0.2)',
    padding: '0.375rem 0.25rem',
    borderRadius: '0.5rem',
    inset: '1rem auto auto 0 !important',

    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 0.75rem 0.75rem 0.75rem',
      borderColor: `transparent transparent ${dropdownSecBg} transparent`,
      position: 'absolute',
      top: '-0.5rem',
      left: '3rem',
    },

    '& .MuiMenuItem-root': {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      whiteSpace: 'normal',
      borderRadius: '0.375rem',
      color: breadcrumbLinkColor,
      padding: '0.25rem 0.5rem',

      '&:hover': {
        color: breadcrumbTextColor,
      },
    },
  },
}));

function Crumb({ id, text, handleClick, href, last = false }) {
  const classes = useStyles();

  if (last) {
    return (
      <Box className={classes.lastCrumb}>
        <Typography>{text}</Typography>
        <ArrowDownIcon sx={{ fontSize: '1rem', paddingLeft: '0.25rem' }} />
      </Box>
    );
  }

  return (
    <Link
      underline="hover"
      href={href}
      onClick={(event) => {
        event.preventDefault();
        handleClick();
      }}
      className={classes.crumb}
    >
      {text}
    </Link>
  );
}

const expand = { id: 'expandButton', text: 'expand' };

export const CustomBreadcrumbsWithMenu = ({ breadcrumbs }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [collapsedCrumbs, setCollapsedCrumbs] = React.useState([]);
  const open = Boolean(anchorEl);
  const collapsed = !!breadcrumbs && breadcrumbs.length > 5;

  const handleClick = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popper-9' : undefined;

  const _breadcrumbs = useMemo(
    function getBreadcrumbs() {
      if (!!breadcrumbs && breadcrumbs.length > 0) {
        if (breadcrumbs.length <= 5) {
          return breadcrumbs;
        }

        const firstItemCrumbs = breadcrumbs.slice(0, 1);
        const restCrumbs = breadcrumbs.slice(1, breadcrumbs.length - 4);
        const lastFourCrumbs = breadcrumbs.slice(-4);

        const newBreadCrumbs = firstItemCrumbs.concat([expand], lastFourCrumbs);
        setCollapsedCrumbs(restCrumbs);

        return newBreadCrumbs;
      }

      return undefined;
    },
    [breadcrumbs]
  );

  return (
    <React.Fragment>
      {collapsedCrumbs && collapsedCrumbs.length > 1 && (
        <Popper
          id={id}
          open={open}
          className={classes.dropDown}
          anchorEl={anchorEl}
          placement="bottom"
          aria-labelledby="with-menu-breadcrumbs"
        >
          {collapsedCrumbs && collapsedCrumbs.length > 1
            ? collapsedCrumbs.map((crumb) => (
                <MenuItem onClick={handleClose} key={crumb.id}>
                  {crumb.text}
                </MenuItem>
              ))
            : null}
        </Popper>
      )}
      <Breadcrumbs
        aria-label="breadcrumbs"
        maxItems={_breadcrumbs.length}
        separator={<ArrowRightIcon sx={{ fontSize: '1rem' }} />}
      >
        {_breadcrumbs &&
          _breadcrumbs.map((crumb, idx) => {
            const index = idx + 1;

            if (crumb.id === 'expandButton') {
              return (
                <Box>
                  <IconButton
                    size="sm"
                    onClick={handleClick}
                    aria-label="expand"
                    className={classes.expand}
                    key={crumb.id}
                  >
                    <MoreHorizIcon
                      sx={{ fontSize: '1rem' }}
                      color={breadcrumbLinkColor}
                    />
                  </IconButton>
                </Box>
              );
            }

            return (
              <Crumb
                text={crumb.text}
                key={crumb.id}
                index={idx}
                last={
                  collapsed
                    ? index === _breadcrumbs.length
                    : index === breadcrumbs.length
                }
              />
            );
          })}
      </Breadcrumbs>
    </React.Fragment>
  );
};
