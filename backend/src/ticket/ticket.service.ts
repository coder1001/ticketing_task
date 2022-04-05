import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './interfaces/ticket.interface';
import { v4 as uuidv4 } from 'uuid';
import { createBarcode } from '../utils/barcodeService';
import { EventService } from '../event/event.service';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [];

  constructor(private eventService: EventService) {}

  create(createTicketDto: CreateTicketDto) {
    if (this.eventService.findOne(createTicketDto.eventId)) {
      const newTicket = {
        id: uuidv4(),
        barcode: createBarcode(8).toUpperCase(),
        ...createTicketDto,
      };
      this.tickets.push(newTicket);

      return newTicket;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Can't create ticket. Event doesn't exist.",
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    return this.tickets;
  }

  findAllByEventId(eventId: string) {
    const eventTickets = this.tickets.filter((ticket) => {
      return ticket.eventId === eventId;
    });
    return eventTickets;
  }

  findOne(id: string) {
    const result = this.tickets.find((ticket: Ticket) => {
      return ticket.id === id;
    });
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    const eventIds = this.tickets.map((ticket) => ticket.id);
    const ticketIndex = eventIds.indexOf(id);

    if (ticketIndex !== -1) {
      const ticket = this.tickets[ticketIndex];

      this.tickets[ticketIndex] = {
        ...ticket,
        ...updateTicketDto,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  remove(id: string) {
    const ticketIds = this.tickets.map((ticket) => ticket.id);
    const ticketIndex = ticketIds.indexOf(id);

    if (ticketIndex !== -1) {
      this.tickets.splice(ticketIndex, 1);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  removeAllFromEvent(eventId: string) {
    if (this.eventService.findOne(eventId)) {
      this.tickets = this.tickets.filter(
        (ticket) => ticket.eventId !== eventId,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Can't delete tickets. Event doesn't exist.",
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
