import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import TicketCard from '../../components/ticketCard/ticketCard';
import { Event } from '../../../../backend/src/event/entities/event.entity';
import styles from './style';
import { useParams } from 'react-router';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment, { Moment } from 'moment-timezone';
import { Ticket } from '../../../../backend/src/ticket/entities/ticket.entity';
import * as apiService from '../../services/apiService';

import { useNavigate } from 'react-router-dom';

export default function EditEvent() {
  const { eventId } = useParams<{ eventId: string }>();

  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');
  const [date, setDate] = React.useState<Moment>(moment());

  const [tickets, setTickets] = React.useState<Ticket[]>();

  let navigate = useNavigate();

  const goBack = () => {
    let path = `/admin`;
    navigate(path);
  };

  useEffect(() => {
    console.log('tst');
    // Get Event
    if (eventId) {
      apiService.getEvent(eventId).then((response) => {
        setTitle(response.title);
        setCity(response.city);
        setDate(moment.unix(response.timestamp));

        // Get Tickets from Event
        getTickets(eventId!).then((allTickets) => {
          setTickets(allTickets);
        });
      });
    }
  }, []);

  const getTickets = async (eventId: string) => {
    const result = await apiService.getAllEventTickets(eventId);

    return result;
  };

  const update = () => {
    axios
      .patch(`http://localhost:3001/event/${eventId}`, {
        title,
        city,
        timestamp: date.unix(),
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        goBack();
      });
  };

  const deleteEvent = () => {
    apiService.deleteEvent(eventId!).then(() => {
      goBack();
    });
  };

  const deleteTicket = (ticketId: string) => {
    apiService
      .deleteTicket(ticketId)
      .then(() => {
        const updatedTickets = tickets!.filter(
          (ticket) => ticket.id !== ticketId,
        );
        setTickets(updatedTickets);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // TODO: Proper validation
  const allowedToUpdate = () => {
    let allowed = true;

    if (title === '') return false;
    if (city === '') return false;

    return allowed;
  };

  return (
    <div style={styles.container}>
      <Box sx={styles.box}>
        <h3>Event bearbeiten</h3>
        <Stack spacing={2}>
          <TextField
            required
            id="outlined-required"
            label="Titel"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            defaultValue={title}
          />
          <TextField
            required
            id="outlined-required"
            label="Stadt"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            defaultValue={city}
          />

          <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} />}
              value={date}
              onChange={(newValue) => {
                if (newValue === null) return;
                setDate(newValue);
              }}
            />
          </LocalizationProvider>

          <Button
            onClick={update}
            disabled={!allowedToUpdate()}
            variant="contained"
          >
            Event aktualisieren
          </Button>

          <Button color="error" onClick={deleteEvent} variant="contained">
            Event löschen
          </Button>
        </Stack>
        <h3>Tickets ({tickets && tickets.length})</h3>
        <List>
          {tickets &&
            tickets.map((ticket: Ticket) => {
              return (
                <TicketCard
                  data={ticket}
                  ctaText={'Löschen'}
                  cta={() => {
                    deleteTicket(ticket.id);
                  }}
                />
              );
            })}
        </List>
      </Box>
    </div>
  );
}
