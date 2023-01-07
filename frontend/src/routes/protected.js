import { 
        Navigate,
        useLocation,
 } from 'react-router-dom';
 import PropTypes from 'prop-types';
import useUser from '../hooks/useAuth';


function PrivateRoute({children, userType}) {

    const location = useLocation();
    const user = useUser(state=>state.user);

    if (!user) {
        //if not user return to login page
        return <Navigate to="/login" replace state={{from: location}}/>;
    }

    if(!user.isVerified){
      //verify account
      return <Navigate to="/verify" replace state={{from: location}}/>;
    }

    if(user.suspended){
        //account has been suspended
        return <Navigate to="/suspended" replace state={{from: location}}/>;
    }

    let permission =  userType.includes(user.userType);

    if (!permission) {
      //you don't have permission to access this
      return <Navigate to="/permission" replace state={{from: location}}/>;
    }

    return children;
}


PrivateRoute.propTypes  = {
  children: PropTypes.element,
  userRole: PropTypes.arrayOf(PropTypes.string)
}

export default  PrivateRoute ;