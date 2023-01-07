import create from 'zustand';
import { persist } from 'zustand/middleware';
import request from '../api/build-request';



const initialState = {
  user: undefined,
  error: undefined,
};

const useUser = create(
  persist(
    (set , get) => ({


  setUserData: (data) => {

    set({ user: {...get().user, ...data} });
  },
  signup: async (data) => {
    set({ user: {...get().user, ...data} });
  },

  logout: async () => {
    set({ error: undefined });
     request().post('/users/signout', {})
     .then(response=>{
      set({user:undefined});
      get().clear();
     })
     .catch(error => {

      console.log(error);
      set({ error: error.response.data?.errors });
     }) 
    
  },
  clear: () => {
    set(() => (initialState));
    sessionStorage.clear(); // or localStorage.clear();
  },

   }),
   {
    name: 'search-storage',
    getStorage: () => sessionStorage,
  }
  )
);


export default useUser;