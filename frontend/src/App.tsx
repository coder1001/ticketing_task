import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Home from './pages/home/home';
import Admin from './pages/admin/admin';

import CreateEvent from './pages/createEvent/createEvent';
import EditEvent from './pages/editEvent/editEvent';

function App() {
  const [events, getEvents] = useState<any[]>();

  useEffect(() => {
    axios
      .get('http://localhost:3001/event/')
      .then(function (response) {
        // handle success
        console.log(response.data);
        getEvents(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Typography
              component={Link}
              to={'/'}
              variant="h6"
              sx={{ flexGrow: 0 }}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              Home
            </Typography>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Typography
              variant="h6"
              component={Link}
              to={'/admin'}
              sx={{ flexGrow: 0 }}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                padding: 10,
              }}
            >
              Admin
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/event/:eventId" element={<EditEvent />} />
        <Route path="/admin/createEvent" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
