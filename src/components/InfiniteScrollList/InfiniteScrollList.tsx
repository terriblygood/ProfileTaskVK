import React, { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useListStore } from '../../store/ListStore';
import ListItem from '../ListItem/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import SortSelector from '../SortSelector';
import TextField from '@mui/material/TextField';
import styles from "./InfiniteScrollList.module.scss"

const InfiniteScrollList: React.FC = observer(() => {
  const listStore = useListStore();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    listStore.fetchItems();
  }, [listStore]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      listStore.fetchItems();
    }
  };

  
  const filteredItems = useMemo(() => {
    return listStore.items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.description.toLowerCase().includes(filter.toLowerCase())
    );
  }, [listStore.items, filter]);

  return (
    <div>
      <SortSelector store={listStore} />
      <TextField
        variant="outlined"
        placeholder="Что хотите найти?"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ borderRadius: '5px', marginBottom: '16px' }} 
      />
      <div className={styles.listContainer} onScroll={handleScroll}>
        {filteredItems.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
        {listStore.loading && (
          <div className={styles.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
});

export default InfiniteScrollList;
