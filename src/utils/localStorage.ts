
/**
 * Utility functions for working with localStorage
 */

// Store types
export type StoreKeys = 'customers' | 'transactions' | 'loans' | 'accounts';

/**
 * Get data from localStorage
 * @param key The key to retrieve data for
 * @returns The data from localStorage or an empty array if none exists
 */
export const getStoreData = <T>(key: StoreKeys): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return [];
  }
};

/**
 * Save data to localStorage
 * @param key The key to save data under
 * @param data The data to save
 */
export const saveStoreData = <T>(key: StoreKeys, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Add an item to localStorage
 * @param key The key to add data under
 * @param item The item to add
 */
export const addStoreItem = <T>(key: StoreKeys, item: T): void => {
  const existingData = getStoreData<T>(key);
  existingData.push(item);
  saveStoreData(key, existingData);
};

/**
 * Update an item in localStorage
 * @param key The key the data is stored under
 * @param id The id property of the item to update
 * @param updatedItem The updated item
 */
export const updateStoreItem = <T extends { id: string }>(
  key: StoreKeys,
  id: string,
  updatedItem: T
): void => {
  const existingData = getStoreData<T>(key);
  const updatedData = existingData.map((item) => 
    (item as any).id === id ? updatedItem : item
  );
  saveStoreData(key, updatedData);
};

/**
 * Delete an item from localStorage
 * @param key The key the data is stored under
 * @param id The id property of the item to delete
 */
export const deleteStoreItem = <T extends { id: string }>(
  key: StoreKeys,
  id: string
): void => {
  const existingData = getStoreData<T>(key);
  const filteredData = existingData.filter((item) => (item as any).id !== id);
  saveStoreData(key, filteredData);
};
