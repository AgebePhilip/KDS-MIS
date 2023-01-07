import * as React from 'react';
import ScrollTop from './components/scrollTop';
import {
  Routes,
  Route
} from "react-router-dom";

import Login from './pages/Home/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/protected';
import { Notifications } from 'react-push-notification';
import AdminLayout from './components/headers/Admin';
import SignUp from './pages/signup';
import { CookiesProvider } from 'react-cookie';
import AboutHome from './pages/About';
import HomeContact from './pages/Contact';
import VerifyAccount from './pages/Auth/verify';
import Profile from './pages/Profile';
import ChangePassword from './pages/Auth/change_password';
import VerifyToken from './pages/Auth/verify_token';
import { ConfirmProvider } from 'material-ui-confirm';
import Users from './pages/Admin/Users/users';
import EditUser from './pages/Admin/Users/editUser';
import Statistic from './pages/Admin/statistics';

const App = () =>{
  return (

    <> 
      <CookiesProvider> 
        <ConfirmProvider>
          <ScrollTop />
          <Notifications position="bottom-right"/>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/signup" element={ <SignUp/>} />
            <Route path="/about"  element={ <AboutHome/>} />
            <Route path="/contact" element={<HomeContact/>} />
              {/** ADMIN ROUTES */}
            <Route path="/dashboard" element={
              
                <AdminLayout></AdminLayout>
            }>


              <Route path="" element={<Statistic />} /> 
              <Route path="profile" element={<Profile />} /> 
              <Route path="users" element={<Users />} />
              <Route path="users/edit" element={<EditUser />} />
            
            </Route>
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/verify_token" element={<VerifyToken />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConfirmProvider>
      </CookiesProvider>
    </>
  )
}

export default App