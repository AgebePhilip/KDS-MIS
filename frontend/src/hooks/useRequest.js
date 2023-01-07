import useNotification from "./useNotification";
import request from 'axios';
import { useNavigate } from "react-router-dom";
import { error_codes } from "../helpers/error-codes";



request.defaults.withCredentials = true;
request.defaults.baseURL=process.env.REACT_APP_BASE_URL;
 
const useRequest = ({url, method, body, onSuccess}) => {
  
  const [warningNotification] = useNotification();
  const  navigate = useNavigate();
  const doRequest = async(inputs = {}, headers = {}, formaData, newUrl) => {
    try {
     const response = await request[method](newUrl? newUrl: url, formaData ? formaData : {...body, ...inputs}, {headers});     
     if(onSuccess){
      onSuccess(response.data.data);
     }
     
     return response

    } catch (error) {
      console.log( error , "realyy");
      console.log(error.response, error);
      const errors = error.response.data?.errors
    
      for(const err of errors){
        warningNotification(err.message)
        if(err?.error_code === error_codes.account_not_verified){
          navigate('/verify')
          return
        }
        if(err?.error_code === error_codes.invalid_key || err?.error_code === error_codes.unauthorized){
          navigate('/login')
          return
        }
      }

    }
  }
  return [
    doRequest
  ]
}


export default useRequest;