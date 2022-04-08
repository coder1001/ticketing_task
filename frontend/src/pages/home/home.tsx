import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import EventCard from '../../components/eventCard/eventCard';
import { Event } from '../../../../backend/src/event/entities/event.entity';
import styles from './style';
import * as apiService from '../../services/apiService';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BuyDialog from '../../components/buyDialog/buyDialog';

export default function Home() {
  const [events, setEvents] = useState<any[]>();

  const [selectedEvent, setSelectedEvent] = useState<Event>();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    apiService
      .getAllEvents()
      .then(function (response: Event[]) {
        setEvents(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  useEffect(() => {}, [dialogOpen]);

  const openBuyTicketDialog = (eventId: string) => {
    if (!events) return;

    const clickedEvent: Event = events.find((ev: Event) => ev.id === eventId);

    if (!clickedEvent) return;

    setSelectedEvent(clickedEvent);
    setDialogOpen(true);
  };

  return (
    <div style={styles.container}>
      <Box sx={styles.box}>
        <List>
          {events &&
            events.map((event: Event) => {
              return (
                <EventCard
                  data={event}
                  ctaText={'Buy ticket'}
                  cta={() => {
                    openBuyTicketDialog(event.id);
                  }}
                />
              );
            })}
        </List>
      </Box>

      {selectedEvent && (
        <BuyDialog
          open={dialogOpen}
          event={selectedEvent!}
          buy={''}
          close={() => handleDialogClose()}
        />
      )}
    </div>
  );
}
