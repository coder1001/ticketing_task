import React from 'react';
import { useParams } from 'react-router';
import styles from './style';
import { Event } from '../../../../backend/src/event/entities/event.entity';
import { Ticket } from '../../../../backend/src/ticket/entities/ticket.entity';
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

export default function TicketCard({
  data,
  ctaText,
  cta,
}: {
  data: Ticket;
  ctaText: string;
  cta: Function;
}) {
  const buttonClicked = () => {
    cta();
  };
  return (
    <Card sx={{ minWidth: 275 }} style={styles.container}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>
          {data.barcode}
        </Typography>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <Typography color="text.secondary" style={styles.property}>
            {data.firstName}
          </Typography>
          <Typography color="text.secondary" style={styles.property}>
            {data.lastName}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          color="error"
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
