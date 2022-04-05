import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Event } from '../../../../backend/src/event/interfaces/event.interface';

import * as apiService from '../../services/apiService';

export default function BuyDialog({
  open,
  event,
  buy,
  close,
}: {
  open: boolean;
  event: Event;
  buy: string;
  close: Function;
}) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  useEffect(() => {
    setFirstName('');
    setLastName('');
  }, [close]);

  const handleBuy = () => {
    apiService
      .createTicket({ firstName, lastName, eventId: event.id })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        close();
      });
  };

  const handleClose = () => {
    close();
  };

  // TODO: Proper validation
  const allowedToCreate = () => {
    let allowed = true;

    if (firstName === '') return false;
    if (lastName === '') return false;

    return allowed;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ticket erstellen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Du erstellst ein Ticket für {event.title} in {event.city}
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Vorname"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
          variant="standard"
        />

        <TextField
          margin="dense"
          id="name"
          label="Nachname"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbrechen</Button>
        <Button disabled={!allowedToCreate()} onClick={handleBuy}>
          Erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
