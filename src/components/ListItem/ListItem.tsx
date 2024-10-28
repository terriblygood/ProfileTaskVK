import React, { useState } from 'react';
import { ListItem as ItemType } from '../../store/ListStore';
import { useListStore } from '../../store/ListStore';
import EditModal from '../EditModal/EditModal';
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
    setModalOpen(false);
  };

  return (
    <div className={styles.listItem} data-cy="list-item">
      <h4 className={styles.itemName} data-cy="item-name">{item.name}</h4>
      <p className={styles.itemDescription} data-cy="item-description">{item.description}</p>
      <button className={styles.button} onClick={() => setModalOpen(true)} data-cy="edit-button">Редактировать</button>
      <button className={styles.button} onClick={handleDelete} data-cy="delete-button">Удалить</button>

      {}
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
