import axios from 'axios';

const request = ()=> {

    return axios.create(
      {
        withCredentials: true,
        baseURL: process.env.REACT_APP_BASE_URL,
      }
    )
}

export default request