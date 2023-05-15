import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Stack } from '@mui/system';
import React from 'react';
import vars from '../../assets/styles/variables';

const { headerBorderColor } = vars;

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    borderRight: `1px solid ${headerBorderColor}`,

    '& .MuiDivider-root': {
      borderColor: headerBorderColor,
    },
    '& .header': {
      minHeight: '2.5rem',
    },
    '& .content': {
      maxHeight: '100%',
      overflow: 'auto',
      marginTop: '1.5rem',
    },
  },
}));

function Sidebar({ header, children }) {
  const classes = useStyles();
  return (
    <Stack className={classes.root}>
      <Box className="header">{header}</Box>
      <Divider />
      <Box className="content">{children}</Box>
    </Stack>
  );
}

export default Sidebar;
