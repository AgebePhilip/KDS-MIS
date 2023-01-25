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
   Collapse, 
   styled} from '@mui/material';
import {ExpandLessRounded,ExpandMoreRounded ,Money, Dashboard,Category, Person, People ,MonetizationOn, LibraryBooks, Logout, VerifiedUser } from '@mui/icons-material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { Roles } from '../../helpers/user-types';
import { canAccess } from '../../helpers/access';
import {NavLink} from 'react-router-dom';
import { menu } from "../../menu";
import { hasChildren } from "../../helpers/util";

import  './style.css';



const MenuItem = ({ item, sideOpen }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} sideOpen={sideOpen} />;
};

const SingleLevel = ({ item, sideOpen }) => {

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton component={NavLink} className='nav-link'
            to={item.to}
            sx={{
              minHeight: 48,
              justifyContent: sideOpen ? 'initial' : 'center',
              px: 2.5
            }}
          >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: sideOpen ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};

const MultiLevel = ({ item,  sideOpen}) => {

  console.log(sideOpen, "sideope");

  const { items: children } = item;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem disablePadding sx={{ display: 'block' }} onClick={handleClick}>
      <ListItemButton component={NavLink} className='nav-link'
          to={item.to}
          sx={{
            minHeight: 48,
            justifyContent: sideOpen ? 'initial' : 'center',
            px: 2.5
          }}
          >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: sideOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} sx={{ opacity: sideOpen ? 1 : 0 }}  />
        {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const drawerWidth = 260;

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
  const [successNotification] = useNotification();


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
      {menu.map((item, key) => <MenuItem key={key} item={item} sideOpen={open}/>)}
    </List>
    <Divider />
    <List sx={{ display: 'block' }}>
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