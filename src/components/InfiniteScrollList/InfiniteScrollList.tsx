import React, { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useListStore } from '../../store/ListStore';
import ListItem from '../ListItem/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import SortSelector from '../SortSelector';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditModal from '../EditModal/EditModal';
import styles from "./InfiniteScrollList.module.scss"

const InfiniteScrollList: React.FC = observer(() => {
  const listStore = useListStore();
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<null | { id: number; name: string; description: string }>(null);

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

  const handleAddClick = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleSave = (name: string, description: string) => {
    if (editingItem) {
      listStore.editItem(editingItem.id, name, description);
    } else {
      listStore.addItem(name, description);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <SortSelector store={listStore} />
      <TextField
        variant="outlined"
        placeholder="Что хотите найти?"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ borderRadius: '5px', marginBottom: '16px' }}
        data-cy="input-search"
      />
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginBottom: '16px' }}>
        Добавить элемент
      </Button>
      <div className={styles.listContainer} onScroll={handleScroll} data-cy="scroll-container">
        {filteredItems.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
        {listStore.loading && (
          <div className={styles.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
      <EditModal
        item={editingItem || { id: 0, name: '', description: '' }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
});

export default InfiniteScrollList;
