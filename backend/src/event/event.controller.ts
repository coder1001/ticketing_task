import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TicketService } from '../ticket/ticket.service';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
  ) {}
  @ApiCreatedResponse({ type: Event })
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Event {
    return this.eventService.create(createEventDto);
  }
  @ApiOkResponse({ type: Event, isArray: true })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOkResponse({ type: Event })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Event {
    return this.eventService.findOne(id);
  }

  @ApiOkResponse({ type: Event })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Event {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  removeEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventService.remove(id);
  }

  @Delete(':id/tickets')
  removeAllTicketsFromEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.removeAllFromEvent(id);
  }

  @ApiOkResponse({ type: Ticket, isArray: true })
  @Get(':id/tickets')
  findAllTicketsFromEvent(@Param('id', ParseUUIDPipe) id: string): Ticket[] {
    return this.ticketService.findAllByEventId(id);
  }
}
