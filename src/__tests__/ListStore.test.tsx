// src/__tests__/ListStore.test.tsx
import { ListStore } from '../store/ListStore';

describe('ListStore', () => {
  let listStore: ListStore;

  beforeEach(() => {
    listStore = new ListStore();
    // Инициализируем элементы с id 1 и 2
    listStore.items = [
      { id: 1, name: 'B', description: 'Item B' },
      { id: 2, name: 'A', description: 'Item A' },
    ];
  });

  it('должен сортировать элементы по имени', () => {
    listStore.setSortField('name');
    expect(listStore.items[0].name).toBe('A'); // Поскольку сортировка по имени
  });

  it('должен сортировать элементы по описанию', () => {
    listStore.setSortField('description');
    expect(listStore.items[0].description).toBe('Item A'); // Проверяем сортировку по описанию
  });

  it('должен удалять элемент по id', () => {
    listStore.removeItem(1);
    expect(listStore.items.length).toBe(1); // Должен остаться только один элемент
    expect(listStore.items[0].id).toBe(2); // Остался элемент с id 2
  });

  it('должен редактировать элемент', () => {
    listStore.editItem(2, 'New Name', 'New Description'); // Изменяем элемент с id 2
    expect(listStore.items[1].name).toBe('New Name'); // Проверяем новое имя
    expect(listStore.items[1].description).toBe('New Description'); // Проверяем новое описание
  });
});
