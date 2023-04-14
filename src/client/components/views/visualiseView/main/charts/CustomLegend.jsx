import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Stack, Typography } from '@mui/material';
import vars from '../../../../../assets/styles/variables';

const { breadcrumbLinkColor } = vars;

const useStyles = makeStyles(() => ({
  topRight: {
    position: 'absolute',
    top: 18,
    left: 16,
    overflowX: 'hidden',
    width: '60%',
    maxWidth: '60%',
  },
  legend: {
    overflowX: 'scroll',
    scrollbarWidth: 'none' /* Firefox */,

    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '& .item': {
      cursor: 'pointer',
      flexShrink: 0,
      '& .MuiTypography-root': {
        fontSize: '0.625rem',
        fontWeight: 500,
        color: breadcrumbLinkColor,
        lineHeight: '1rem',
        // wordWrap: 'normal',
      },
    },
  },
}));

const CustomLegend = ({ legend, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.topRight}>
      {Array.isArray(legend) ? (
        <Stack direction="row" spacing={1} className={classes.legend}>
          {legend.map((item, index) => {
            console.log(item, 'item');
            return (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                onClick={() => onClick(index)}
                spacing={0.5}
                className="item"
              >
                <div
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: item.color,
                    borderRadius: '2px',
                  }}
                />
                <Typography>{item?.name}</Typography>
              </Stack>
            );
          })}
        </Stack>
      ) : null}
    </Box>
  );
};

export default CustomLegend;
