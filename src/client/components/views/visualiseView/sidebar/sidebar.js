import { Box, InputBase, Stack } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import SidebarLayout from '../../../../layout/visualise/sidebar';
import SEARCHICON from '../../../../assets/svg/search.svg';
import { makeStyles } from '@mui/styles';
import GroupElement from './connected/GroupElement';
import debounce from 'lodash.debounce';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    placeContent: 'center',
    paddingInline: '1rem',
    height: '100%',

    '& .MuiInputBase-root': {
      fontSize: '0.875rem',
      width: '100%',
    },
  },
  content: {
    paddingInline: '1rem',
  },
}));

function Sidebar({ properties }) {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // debounce search term
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 800),
    []
  );

  function onSearch(event) {
    event.preventDefault();
    event.stopPropagation();

    setQuery(event.target.value);
    debounceFn(event.target.value);
  }

  const filteredProperties = useMemo(() => {
    const searchQuery = searchTerm.toLocaleLowerCase();
    const filtered = properties.map((prop) => {
      if (
        !!searchQuery &&
        prop.children !== undefined &&
        Array.isArray(prop.children)
      ) {
        const filteredPropChildren = prop.children.filter((c) =>
          c.label.toLowerCase().startsWith(searchQuery)
        );

        return { ...prop, children: filteredPropChildren };
      }

      return prop;
    });

    return !!searchTerm ? filtered : properties;
  }, [properties, searchTerm]);

  console.log(searchTerm, query, 'searchTerm');
  return (
    <SidebarLayout
      header={
        <Box className={classes.header}>
          <InputBase
            id="standard-search-input"
            placeholder="Search"
            variant="filled"
            value={query}
            onChange={(e) => onSearch(e)}
            endAdornment={
              <img
                src={SEARCHICON}
                alt="search-icon"
                aria-labelledby="search"
              />
            }
          />
        </Box>
      }
    >
      <Stack spacing={3} className={classes.content}>
        {!!filteredProperties &&
          Array.isArray(filteredProperties) &&
          filteredProperties.map((prop, index) => (
            <GroupElement key={index} {...prop} />
          ))}
      </Stack>
    </SidebarLayout>
  );
}

export default Sidebar;
