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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment, { Moment } from 'moment-timezone';

import { useNavigate } from 'react-router-dom';

import * as apiService from '../../services/apiService';

export default function CreateEvent() {
  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');
  const [date, setDate] = React.useState<Moment>(moment());

  let navigate = useNavigate();

  const goBack = () => {
    let path = `/admin`;
    navigate(path);
  };

  const create = () => {
    apiService
      .createEvent({
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

  // TODO: Proper validation
  const allowedToCreate = () => {
    let allowed = true;

    if (title === '') return false;
    if (city === '') return false;

    return allowed;
  };

  return (
    <div style={styles.container}>
      <Box sx={styles.box}>
        <h3>Neues Event</h3>
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
            onClick={create}
            disabled={!allowedToCreate()}
            variant="contained"
          >
            Event erstellen
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
