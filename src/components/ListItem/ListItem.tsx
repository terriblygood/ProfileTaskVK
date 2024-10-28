// src/components/ListItem.tsx
import React, { useState } from 'react';
import { ListItem as ItemType } from '../../store/ListStore';
import { useListStore } from '../../store/ListStore';
import EditModal from '../EditModal/EditModal'; // Импортируем модалку
import styles from './ListItem.module.scss'; 

interface Props {
  item: ItemType;
}

const ListItem: React.FC<Props> = ({ item }) => {
  const listStore = useListStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    listStore.removeItem(item.id);
  };

  const handleEdit = (name: string, description: string) => {
    listStore.editItem(item.id, name, description);
    setModalOpen(false); // Закрываем модалку после сохранения
  };

  return (
    <div className={styles.listItem}>
      <h4 className={styles.itemName}>{item.name}</h4>
      <p className={styles.itemDescription}>{item.description}</p>
      <button className={styles.button} onClick={() => setModalOpen(true)}>Редактировать</button>
      <button className={styles.button} onClick={handleDelete}>Удалить</button>

      {/* Отображаем модалку для редактирования */}
      <EditModal
        item={item}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleEdit}
      />
    </div>
  );
};

export default ListItem;
