import addNotification from 'react-push-notification';

const useNotification = () => {

  const  warningNotification =(messgae, action) =>{
    addNotification({
      title: 'Warning',
      subtitle: action,
      message: messgae,
      duration: 6000,
      theme: 'red',
      closeButton:"X"
    })
  }

  const successNotification =(messgae, action)=>{
    addNotification({
      title: 'Success',
      subtitle: ""+action,
      message: messgae,
      theme: 'light',
      duration: 6000,
      closeButton:"X",
      backgroundTop:"green",
      backgroundBottom:"yellowgreen"
    })
  };

  const infoNotification =(messgae, action)=>{
    addNotification({
      title: 'Information',
      subtitle: ""+action,
      message: messgae,
      theme: 'light',
      duration: 6000,
      closeButton:"X",
      backgroundTop:"#038d9d",
      backgroundBottom:"#32c3cd"
    })
  };

  return [
    warningNotification,
    successNotification,
    infoNotification
  ]
}

export default useNotification;