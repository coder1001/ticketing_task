import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import EventCard from '../../components/eventCard/eventCard';
import { Event } from '../../../../backend/src/event/interfaces/event.interface';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import styles from './style';
import * as apiService from '../../services/apiService';

export default function Admin() {
  const [events, getEvents] = useState<any[]>();

  useEffect(() => {
    apiService
      .getAllEvents()
      .then(function (response: Event[]) {
        getEvents(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  let navigate = useNavigate();

  const routeToCreateEventPage = () => {
    let path = `createEvent`;
    navigate(path);
  };

  const routeToEditEventPage = (eventId: string) => {
    let path = `/event/${eventId}`;
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <Box sx={styles.box}>
        <List>
          {events?.map((event: Event) => {
            return (
              <EventCard
                data={event}
                ctaText={'Edit'}
                cta={() => {
                  routeToEditEventPage(event.id);
                }}
              />
            );
          })}
        </List>
      </Box>
      <Button onClick={routeToCreateEventPage} variant="contained">
        Neues Event
      </Button>
    </div>
  );
}
