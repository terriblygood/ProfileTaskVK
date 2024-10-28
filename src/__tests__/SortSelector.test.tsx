// src/__tests__/SortSelector.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListStore } from '../store/ListStore'; // Импортируйте ListStore
import SortSelector from '../components/SortSelector';
import { observer } from 'mobx-react-lite';

const MockedSortSelector: React.FC<{ store: ListStore }> = observer(({ store }) => {
  return <SortSelector store={store} />;
});

describe('SortSelector', () => {
  let listStore: ListStore;

  beforeEach(() => {
    listStore = new ListStore();
  });

  it('should render the sort options', () => {
    render(<MockedSortSelector store={listStore} />);
    
    const combobox = screen.getByRole('combobox');
    fireEvent.mouseDown(combobox);

    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('Name');
    expect(options[1]).toHaveTextContent('Description');
  });

  it('should change sort field when a new option is selected', () => {
    render(<MockedSortSelector store={listStore} />);
    
    const combobox = screen.getByRole('combobox');
    fireEvent.mouseDown(combobox);

    fireEvent.click(screen.getByText('Description'));
    
    expect(listStore.sortField).toBe('description');
  });
});
