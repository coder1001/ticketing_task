import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../event/event.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

const exampleEventCreateDto = {
  title: 'Pollerwiesen',
  timestamp: 1649162850,
  city: 'Köln',
};

const exampleName = {
  firstName: 'Marko',
  lastName: 'Susic',
};

const updateFirstName = {
  firstName: 'Holger',
};

describe('TicketController', () => {
  let ticketController: TicketController;
  let eventService: EventService;
  let ticketService: TicketService;

  beforeEach(async () => {
    eventService = new EventService();
    ticketService = new TicketService(eventService);
    ticketController = new TicketController(ticketService);

    await eventService.create(exampleEventCreateDto);
  });

  describe('findAll', () => {
    it('should return two tickets', async () => {
      const createdEvents = await eventService.findAll();

      // Create two tickets
      await ticketService.create({
        eventId: createdEvents[0].id,
        ...exampleName,
      });
      await ticketService.create({
        eventId: createdEvents[0].id,
        ...exampleName,
      });

      const allTickets = await ticketController.findAll();
      expect(allTickets).toHaveLength(2);
    });
  });

  describe('create', () => {
    it('should fail because of invalid event', async () => {
      let errorStatus = 0; // HttpStatus.NOT_FOUND;
      // Create two tickets
      try {
        await ticketController.create({
          eventId: '12345',
          ...exampleName,
        });
      } catch (e) {
        errorStatus = e.status;
      }

      expect(errorStatus).toBe(404);
    });

    it('should create correct ticket', async () => {
      const createdEvent = (await eventService.findAll())[0];
      await ticketController.create({
        eventId: createdEvent.id,
        ...exampleName,
      });

      const createdTicket = (await ticketController.findAll())[0];

      expect(createdTicket).toHaveProperty('firstName', exampleName.firstName);
      expect(createdTicket).toHaveProperty('lastName', exampleName.lastName);
      expect(createdTicket).toHaveProperty('barcode');
      expect(createdTicket).toHaveProperty('id');
      expect(createdTicket).toHaveProperty('eventId', createdEvent.id);
    });
  });

  describe('delete', () => {
    it('should delete ticket', async () => {
      const createdEvents = await eventService.findAll();

      // Create two tickets
      await ticketService.create({
        eventId: createdEvents[0].id,
        ...exampleName,
      });

      await ticketService.create({
        eventId: createdEvents[0].id,
        ...exampleName,
      });

      const createdTicket = [...(await ticketController.findAll())][0];
      await ticketController.remove(createdTicket.id);

      const allTickets = await ticketController.findAll();

      expect(allTickets).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('update firstname', async () => {
      const createdEvents = await eventService.findAll();

      // Create two tickets
      await ticketService.create({
        eventId: createdEvents[0].id,
        ...exampleName,
      });

      const createdTicket = [...(await ticketController.findAll())][0];

      await ticketController.update(createdTicket.id, updateFirstName);

      const updatedTicket = [...(await ticketController.findAll())][0];

      expect(updatedTicket).toHaveProperty(
        'firstName',
        updateFirstName.firstName,
      );
    });
  });
});
