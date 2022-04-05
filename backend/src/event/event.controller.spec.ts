import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { EventModule } from './event.module';

describe('EventController', () => {
  let app: INestApplication;

  let eventController: EventController;
  // let eventService: EventService;

  const eventService = { findAll: () => [] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EventModule],
      controllers: [EventController],
      providers: [EventService],
    })
      .overrideProvider(EventService)
      .useValue(eventService)
      .compile();

    // eventService = moduleRef.get<EventService>(EventService);
    eventController = moduleRef.get<EventController>(EventController);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET event`, () => {
    return request(app.getHttpServer()).get('/event').expect(200).expect({
      data: eventService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
