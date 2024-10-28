import React, { useState } from 'react';
import { Modal, Typography, TextField, Button, Box } from '@mui/material';
import styles from './EditModal.module.scss';

interface EditModalProps {
  item: {
    id: number;
    name: string;
    description: string;
  };
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, open, onClose, onSave }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    onSave(name, description);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box className={styles.modalContent}>
        <Typography id="edit-modal-title" variant="h6" component="h2">
          Редактировать элемент
        </Typography>
        <TextField
          label="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box className={styles.buttonContainer}>
          <Button onClick={onClose} color="secondary" variant="outlined" sx={{ mr: 1 }}>
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
