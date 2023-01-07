import create from 'zustand';
import request from '../api/build-request';

const useTransaction = create((set) => ({
  transactions: [],

  fetchTransactions: async () => {
    try {
    const res = await request().get('/transactions')

      console.log(res.data);

      set(state=>({transactions:[...res.data?.data]}));
    } catch (error) {
      console.log(error);
       throw new Error(error.response?.data)
    }  
   },

  addTransaction: (data) => {
     set(state=>({transactions:[...state.transactions, data]}));
  },
  deleteTransaction: (data) => {
    set(state=>({transactions:state.transactions.filter(trans=>{
      return trans.id!==data.id
    })}));
  }

}));

export default useTransaction;