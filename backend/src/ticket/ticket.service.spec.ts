import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../event/event.service';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let ticketService: TicketService;
  let eventService: EventService;

  beforeEach(async () => {
    eventService = new EventService();
    ticketService = new TicketService(eventService);
  });

  it('should be defined', () => {
    expect(ticketService).toBeDefined();
  });
});
