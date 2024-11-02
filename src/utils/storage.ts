// utils/storage.ts
export const storage = {
    save: (key: string, data: any) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving data to localStorage: ${error}`);
      }
    },
  
    load: <T>(key: string, fallback: T): T => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (error) {
        console.error(`Error loading data from localStorage: ${error}`);
        return fallback;
      }
    },
  
    remove: (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing data from localStorage: ${error}`);
      }
    }
  };