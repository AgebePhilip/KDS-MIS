import CryptoJS from 'crypto-js'

class Protection {
  
  encryt(data) {
   const newData = this.convert(data)
   const cipherText = CryptoJS.AES.encrypt(newData, process.env.REACT_APP_SECRET_KEY)
    return cipherText
  }
  decryt(cipherText) {
    const result = CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET_KEY)
    return result
  }
  convert(data){

    if(typeof data === 'string'){
        return data
    }
    return JSON.stringify(data);
  }
} 

export default new Protection();