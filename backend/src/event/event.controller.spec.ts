import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TicketService } from '../ticket/ticket.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { EventModule } from './event.module';
import { createBarcode } from '../utils/barcodeService';
import { TicketModule } from '../ticket/ticket.module';

const exampleCreateDto = {
  title: 'Pollerwiesen',
  timestamp: 1649162850,
  city: 'Köln',
};

const exampleUpdateDto = {
  title: 'Pollerwiesen',
  timestamp: 1649162850,
  city: 'Dortmund',
};

const exampleName = {
  firstName: 'Marko',
  lastName: 'Susic',
};

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;
  let ticketService: TicketService;

  beforeEach(async () => {
    eventService = new EventService();
    ticketService = new TicketService(eventService);
    eventController = new EventController(eventService, ticketService);
  });

  describe('findAll', () => {
    it('should return 3 items', async () => {
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      // jest.spyOn(eventService, 'findAll').mockImplementation(() => result);

      expect(await eventController.findAll()).toHaveLength(3);
    });

    it('should return 3 items', async () => {
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      // jest.spyOn(eventService, 'findAll').mockImplementation(() => result);

      expect(await eventController.findAll()).toHaveLength(2);
    });
  });

  describe('create', () => {
    it('retreive correct data', async () => {
      eventService.create(exampleCreateDto);
      // jest.spyOn(eventService, 'findAll').mockImplementation(() => result);
      const allEvents = await eventController.findAll();
      const receivedEvent = await eventController.findOne(allEvents[0].id);
      expect(receivedEvent).toHaveProperty('title', exampleCreateDto.title);
      expect(receivedEvent).toHaveProperty('city', exampleCreateDto.city);
      expect(receivedEvent).toHaveProperty(
        'timestamp',
        exampleCreateDto.timestamp,
      );
    });
  });

  describe('delete', () => {
    it('delete one item', async () => {
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      // jest.spyOn(eventService, 'findAll').mockImplementation(() => result);
      let allEvents = [...(await eventController.findAll())];
      await eventController.removeEvent(allEvents[0].id);
      allEvents = await eventController.findAll();

      expect(allEvents).toHaveLength(2);
    });

    it('delete three items', async () => {
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      eventService.create(exampleCreateDto);
      // jest.spyOn(eventService, 'findAll').mockImplementation(() => result);
      let allEvents = [...(await eventController.findAll())];
      await eventController.removeEvent(allEvents[0].id);
      await eventController.removeEvent(allEvents[1].id);
      await eventController.removeEvent(allEvents[2].id);
      allEvents = await eventController.findAll();
      expect(allEvents).toHaveLength(0);
    });

    describe('Update', () => {
      it('should update the city', async () => {
        eventService.create(exampleCreateDto);
        // jest.spyOn(eventService, 'findAll').mockImplementation(() => result);
        const eventBeforeUpdate = (await eventController.findAll())[0];

        eventService.update(eventBeforeUpdate.id, exampleUpdateDto);

        const eventAfterUpdate = (await eventController.findAll())[0];

        expect(eventAfterUpdate).toHaveProperty(
          'title',
          exampleCreateDto.title,
        );
        expect(eventAfterUpdate).toHaveProperty('city', exampleUpdateDto.city);
        expect(eventAfterUpdate).toHaveProperty(
          'timestamp',
          exampleCreateDto.timestamp,
        );
      });
    });

    describe('Get and delete all tickets from event', () => {
      it('should get two tickets for event', async () => {
        eventService.create(exampleCreateDto);
        const createdEvent = (await eventController.findAll())[0];

        // Create two tickets
        ticketService.create({ eventId: createdEvent.id, ...exampleName });
        ticketService.create({ eventId: createdEvent.id, ...exampleName });
        ticketService.create({ eventId: createdEvent.id, ...exampleName });

        const allTickets = await eventController.findAllTicketsFromEvent(
          createdEvent.id,
        );

        expect(allTickets).toHaveLength(3);
      });

      it('should delete all tickets from event', async () => {
        eventService.create(exampleCreateDto);
        const createdEvent = (await eventController.findAll())[0];

        // Create two tickets
        ticketService.create({ eventId: createdEvent.id, ...exampleName });
        ticketService.create({ eventId: createdEvent.id, ...exampleName });

        const allTicketsBefore = [
          ...(await eventController.findAllTicketsFromEvent(createdEvent.id)),
        ];

        await eventController.removeAllTicketsFromEvent(createdEvent.id);

        const allTicketsAfter = [
          ...(await eventController.findAllTicketsFromEvent(createdEvent.id)),
        ];

        expect(allTicketsBefore).toHaveLength(2);
        expect(allTicketsAfter).toHaveLength(0);
      });
    });
  });
});
