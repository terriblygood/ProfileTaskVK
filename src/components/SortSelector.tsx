import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ListStore, SortField } from '../store/ListStore';

interface SortSelectorProps {
  store: ListStore;
}

const SortSelector: React.FC<SortSelectorProps> = ({ store }) => {
  const handleChange = (event: SelectChangeEvent<SortField>) => {
    store.setSortField(event.target.value as SortField);
  };

  return (
    <Select
      value={store.sortField}
      onChange={handleChange}
      style={{ width: 200 }}
      displayEmpty
      data-cy="sort-selector"
    >
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="description">Description</MenuItem>
    </Select>
  );
};

export default SortSelector;
