import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';

describe('TicketService', () => {
  let eventService: EventService;

  beforeEach(async () => {
    eventService = new EventService();
  });

  it('should be defined', () => {
    expect(eventService).toBeDefined();
  });
});
