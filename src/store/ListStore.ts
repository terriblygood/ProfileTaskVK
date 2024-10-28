import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

export interface ListItem {
  id: number;
  name: string;
  description: string;
}

export type SortField = 'name' | 'description';

export class ListStore {
  items: ListItem[] = [];
  loading = false;
  page = 1;
  hasMore = true;
  sortField: SortField = 'name';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchItems() {
    if (!this.hasMore || this.loading) return;
    this.loading = true;

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}`
      );
      const data = await response.json();
      const newItems = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description || "No description"
      }));
      this.items = [...this.items, ...newItems];
      this.page += 1;
      this.hasMore = newItems.length > 0;
      this.sortItems();
    } catch (error) {
      console.error("Failed to load items", error);
    } finally {
      this.loading = false;
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  editItem(id: number, newName: string, newDescription: string) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.name = newName;
      item.description = newDescription;
    }
    this.sortItems();
  }

  setSortField(field: SortField) {
    this.sortField = field;
    this.sortItems();
  }

  sortItems() {
    this.items = this.items.slice().sort((a, b) => {
      if (a[this.sortField] < b[this.sortField]) return -1;
      if (a[this.sortField] > b[this.sortField]) return 1;
      return 0;
    });
  }
}

const ListStoreContext = createContext(new ListStore());
export const useListStore = () => useContext(ListStoreContext);
