import create from 'zustand';
import { persist } from 'zustand/middleware';

const useSelectedUser = create(
  persist(
    (set , get) => ({

   user:{},
   selectUser: (data) =>{
      console.log("new data", get().user, data);
      set({user: {...get().user, ...data}})
    },
    clear: () => {
      set(() => ({user:{}}));
      sessionStorage.clear(); // or localStorage.clear();
    },

   }),
   {
    name: 'search-storage',
    getStorage: () => sessionStorage,
  }
  )
);


export default useSelectedUser;