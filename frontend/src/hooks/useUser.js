import create from 'zustand';
import request from '../api/build-request';

const useUsers = create((set, get) => ({
  users: [],
  fetchALLUsers: async () => {
    try {
    const res = await request().get('/users')

    console.log(res, "res");
      set(state=>({users:[...res.data?.data]}));
    } catch (error) {

      console.log(error);
       throw new Error(error.response?.data)
    }  
   },

  addUser: (data) => {
     set(state=>({users:[...state.users, data]}));
  },
  editUser: (data) => {

    set(state=>({users:state.users.map(user=>{
        if(user.id===data.id){
          return {...user, ...data}
        }
        return user
    })}));
  },
  deleteUser: (data) => {
    set(state=>({users:state.users.filter(user=>{
      return user.id!==data.id
    })}));
  },
  selectUser: (data) =>{
    console.log("new data", get().user, data);
    set(state=>({user: {...state.user, ...data}}))
  }
}));

export default useUsers;