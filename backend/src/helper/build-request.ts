import axios from 'axios';

const request = ()=> {

    return axios.create(
      {
        baseURL: process.env.PAYSTACK_BASE_URL,
        headers: { 
          Authorization:`Bearer ${ process.env.PAYSTACK}`, 
        }
      }
    )
}
export default request();