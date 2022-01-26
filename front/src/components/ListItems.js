import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublishIcon from '@mui/icons-material/Publish';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth';


export const mainListItems = (
  <div >
    <ListItem button component={Link} to='/dashboard' >
      <ListItemIcon >
        <DashboardIcon color='primary' />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to='/import'>
      
      <ListItemIcon>
       <PublishIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="Importar csv" />
    </ListItem>
    <ListItem button onClick={() => AuthService.logout()} component={Link} to='/login'>
      <ListItemIcon>
        <LogoutIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
   
  </div>
);

