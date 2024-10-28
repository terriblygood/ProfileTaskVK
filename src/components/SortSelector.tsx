// src/components/SortSelector.tsx
import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ListStore, SortField } from '../store/ListStore';

interface SortSelectorProps {
  store: ListStore; // Добавляем store как обязательный пропс
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
    >
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="description">Description</MenuItem>
    </Select>
  );
};

export default SortSelector;
