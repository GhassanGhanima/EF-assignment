// src/utils/localStorageUtils.ts
export const setItem = <T>(key: string, value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  };
  
  export const getItem = <T>(key: string): T | null => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return null;
    }
  };
  
  export const removeItem = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  };
  