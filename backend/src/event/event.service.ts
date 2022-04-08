import { Injectable } from '@nestjs/common';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { Event } from './entities/event.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateEventDto } from 'src/event/dto/update-event.dto';

@Injectable()
export class EventService {
  private readonly events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    const newEvent = {
      id: uuidv4(),
      ...createEventDto,
    };
    this.events.push(newEvent);

    return newEvent;
  }

  findAll(): Event[] {
    return this.events;
  }

  findOne(id: string): Event | undefined {
    const result = this.events.find((event: Event) => {
      return event.id === id;
    });
    return result;
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    const eventIds = this.events.map((event) => event.id);
    const eventIndex = eventIds.indexOf(id);

    if (eventIndex !== -1) {
      const event = this.events[eventIndex];

      this.events[eventIndex] = {
        ...event,
        ...updateEventDto,
      };

      return this.events[eventIndex];
    }
  }

  remove(id: string) {
    const eventIds = this.events.map((event) => event.id);
    const eventIndex = eventIds.indexOf(id);

    if (eventIndex !== -1) {
      this.events.splice(eventIndex, 1);
    }
  }
}
