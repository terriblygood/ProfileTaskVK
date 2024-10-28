// src/__tests__/EditModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditModal from '../components/EditModal/EditModal';

describe('EditModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    render(
      <EditModal
        item={{ id: 1, name: 'JavaScript', description: 'No description' }}
        open={true} // Убедитесь, что open передан
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
  });

  test('должен отображать начальные значения', () => {
    expect(screen.getByDisplayValue('JavaScript')).toBeInTheDocument();
    expect(screen.getByDisplayValue('No description')).toBeInTheDocument();
  });

  test('должен вызывать onSave с новыми значениями', () => {
    fireEvent.change(screen.getByLabelText(/имя/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText(/описание/i), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText(/сохранить/i));

    expect(mockOnSave).toHaveBeenCalledWith('New Name', 'New Description');
  });

  test('должен вызывать onClose при закрытии', () => {
    fireEvent.click(screen.getByText(/отмена/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
