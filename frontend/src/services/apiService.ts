import axios from 'axios';
import { Event } from '../../../backend/src/event/entities/event.entity';
import { Ticket } from '../../../backend/src/ticket/entities/ticket.entity';
interface CreateTicketDto {
  firstName?: string;
  lastName?: string;
  eventId?: string;
}

interface UpdateTicketDto {
  firstName?: string;
  lastName?: string;
  eventId?: string;
}

interface CreateEventDto {
  title: string;
  timestamp: number;
  city: string;
}

interface UpdateEventDto {
  title?: string;
  timestamp?: number;
  city?: string;
}

const BASE_URL = 'http://localhost:3001/';
const EVENT_PATH = 'event/';
const TICKET_PATH = 'ticket/';

/*
 * EVENT CALLS
 */

/**
 * Fetching all events
 *
 * @returns Event-Array
 */
export const getAllEvents = async (): Promise<Event[]> => {
  const result = await axios.get(`${BASE_URL}${EVENT_PATH}`);
  return result.data;
};

/**
 * Fetching all tickets from event
 *
 * @returns Event-Array
 */
export const getAllEventTickets = async (
  eventId: string,
): Promise<Ticket[]> => {
  const result = await axios.get(`${BASE_URL}${EVENT_PATH}${eventId}/tickets`);
  return result.data;
};

/**
 * Get one event
 *
 * @returns Event
 */
export const getEvent = async (eventId: string): Promise<Event> => {
  const result = await axios.get(`${BASE_URL}${EVENT_PATH}${eventId}`);
  return result.data;
};

/**
 * deletes Event + Tickets
 *
 * @param eventId - event uuid as string
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}${EVENT_PATH}${eventId}`);
  await axios.delete(`${BASE_URL}${EVENT_PATH}${eventId}/tickets`);
};

/**
 * Create a new event
 *
 * @returns Event-Array
 */
export const createEvent = async (
  createEventDto: CreateEventDto,
): Promise<Event> => {
  const result = await axios.post(`${BASE_URL}${EVENT_PATH}`, createEventDto);
  return result.data;
};

/*
 * TICKET CALLS
 */

/**
 * Creates a new ticket for an event
 *
 * @param createTicketDto - Ticket DTO
 * @returns Ticket
 */
export const createTicket = async (
  createTicketDto: CreateTicketDto,
): Promise<Ticket> => {
  const result = await axios.post(`${BASE_URL}${TICKET_PATH}`, createTicketDto);
  return result.data;
};

/**
 * Deletes a ticket
 *
 * @param ticketId - ticket uuid as string
 */
export const deleteTicket = async (ticketId: string) => {
  await axios.delete(`${BASE_URL}${TICKET_PATH}${ticketId}`);
};
