import { createStore } from "zustand/vanilla"
import { persist, createJSONStorage } from 'zustand/middleware'

const store = createStore(persist(
    () => ({
      group: null,
      groups: {
        // can leave empty as initialiser
      }}),
    {
      name: 'group-storage', // unique name
    //   storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ))