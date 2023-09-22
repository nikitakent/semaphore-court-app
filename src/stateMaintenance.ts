import { createStore } from "zustand/vanilla"
import { persist, createJSONStorage, StateStorage} from 'zustand/middleware'
import { get, set, del } from 'idb-keyval' // can use anything: IndexedDB, Ionic Storage, etc.

// Custom storage object
// DEV NOTE: please note that this custom storage object assumes there
// is no string data that has the form /^[1-9]+[0-9]*n$/ (e.g. 9223372036854775807n),
// otherwise the string data will be converted to BigInt upon retrieval.

const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
      console.log(name, 'has been retrieved');
      const value = await get(name);
      return value ? JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v) : null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      console.log(name, 'with value', value, 'has been saved');
      const parsedValue = JSON.parse(value, (_, v) => v && v.toString().match(/^[1-9]+[0-9]*n$/) ? BigInt(v.slice(0, -1)) : v);
      await set(name, parsedValue);
    },
    removeItem: async (name: string): Promise<void> => {
      console.log(name, 'has been deleted');
      await del(name);
    },
  };
  
const store = createStore(persist(
    () => ({
      group: null,
      groups: {
        // can leave empty as initialiser
      }}),
    {
      name: 'group-storage', // unique name
      storage: createJSONStorage(() => storage), // (optional) by default, 'localStorage' is used
    }
  ))

export default store