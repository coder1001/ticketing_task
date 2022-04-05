import React from 'react';
import { useParams } from 'react-router';
import styles from './style';
import { Event } from '../../../../backend/src/event/interfaces/event.interface';
import moment from 'moment-timezone';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AltRouteTwoTone } from '@mui/icons-material';

export default function EventCard({
  data,
  ctaText,
  cta,
}: {
  data: Event;
  ctaText: string;
  cta: Function;
}) {
  const buttonClicked = () => {
    cta();
  };
  return (
    <Card sx={{ minWidth: 275 }} style={styles.container}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          {data.title}
        </Typography>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <Typography color="text.secondary" style={styles.property}>
            <CalendarMonthIcon color="primary" />{' '}
            {moment.unix(data.timestamp).format('DD.MM.YYYY')}
          </Typography>
          <Typography
            sx={{ mb: 0.5 }}
            color="text.secondary"
            style={styles.property}
          >
            <AccessTimeIcon color="primary" />{' '}
            {moment.unix(data.timestamp).format('HH:mm')}
          </Typography>
        </div>

        <Typography style={styles.property} color="text.secondary">
          <LocationOnIcon color="primary" /> {data.city}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            buttonClicked();
          }}
          size="small"
        >
          {ctaText}
        </Button>
      </CardActions>
    </Card>
  );
}
