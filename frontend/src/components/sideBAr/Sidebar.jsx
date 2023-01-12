import * as React from 'react';
import {
   Divider,
   Drawer as MuiDrawer, 
   IconButton,
   List,
   ListItem, 
   ListItemButton,
   ListItemIcon,
   ListItemText, 
   styled} from '@mui/material';
import {Money, Dashboard,Category, Person, People ,MonetizationOn, LibraryBooks, Logout, VerifiedUser } from '@mui/icons-material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { Roles } from '../../helpers/user-types';
import { canAccess } from '../../helpers/access';
import {NavLink} from 'react-router-dom';
import  './style.css';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function MainSiderBar({open, theme, handleDrawerClose }){
 
  const navigate = useNavigate();

  const user = useUser(state => state.user);
  const logout = useUser(state => state.logout);
  const [warningNotification, successNotification] = useNotification();

  const handleChck =(e)=>{
    //e.preventDefault();
    console.log(e);
    return true;
  }
  const handleLogout = () =>{
    logout()
    successNotification("successfully logout")
    navigate("/")
  }

  return (
    <Drawer variant="permanent" open={open} >
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
    <ListItem  disablePadding sx={{ display: 'block' }}>
          <ListItemButton component={NavLink} className='nav-link'
            to='/dashboard'
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"}  sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem  disablePadding sx={{ display: 'block' }}>
          <ListItemButton component={NavLink} className='nav-link'
            to='/dashboard/profile'
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Person />
            </ListItemIcon>
            <ListItemText primary={"Profile"}  sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        {
          canAccess(
            [Roles.admin, Roles.bookmod, Roles.lecturer],
            user.userType,
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton component="a"
                href='/dashboard/nopage'
                onClick={handleChck}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText primary={"Nopage"}  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            )
        } 
        {
          canAccess(
            [Roles.admin, Roles.catmod],
            user.userType,
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={NavLink}
                to='/dashboard/nopage'
                onClick={handleChck}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Category />
                </ListItemIcon>
                <ListItemText primary={"nopages"}  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            )
        }    
        {
          user.userType === "admin" &&         <ListItem  disablePadding sx={{ display: 'block' }}>
          <ListItemButton component="a"
            href='/dashboard/subscriptions'
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText primary={"Subscriptions"}  sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        }

        {
          user.userType === "admin" &&         <ListItem  disablePadding sx={{ display: 'block' }}>
          <ListItemButton component="a"
            href='/dashboard/users'
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <People />
            </ListItemIcon>
            <ListItemText primary={"Users"}  sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        }

        {
          user.userType === "user" && <ListItem  disablePadding sx={{ display: 'block' }}>
          <ListItemButton component="a"
            href='/dashboard/plans'
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Money />
            </ListItemIcon>
            <ListItemText primary={"My Pans"}  sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        }


    </List>
    <Divider />
    <List>
      {['logout'].map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          <ListItemButton 
            component="button"
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
               <Logout />
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
  )
} 