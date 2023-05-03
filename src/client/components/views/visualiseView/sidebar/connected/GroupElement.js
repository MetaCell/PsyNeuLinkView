import { Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Element from './Element';
import { string, arrayOf, shape } from 'prop-types';
import vars from '../../../../../assets/styles/variables';

const { breadcrumbLinkColor } = vars;

const useStyles = makeStyles(_ => ({
  root: {
    '& .text': {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '1.25rem',
      color: breadcrumbLinkColor,
      whiteSpacing: 'nowrap',
    },
  },
}));

const GroupElement = props => {
  const classes = useStyles();
  const { id, label, children } = props;

  if (!children || children.length <= 0) return null;

  return (
    <Stack key={id} className={classes.root} spacing={1}>
      <Typography className="text">{label}</Typography>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
        {children.map(({ id, label, type }) => (
          <Box gridColumn="span 6">
            <Element key={id} id={id} name={label} type={'element'} />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default GroupElement;

GroupElement.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  children: arrayOf(
    shape({
      id: string.isRequired,
      label: string,
      type: string,
    })
  ),
};
