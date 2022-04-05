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
import { TicketService } from '../ticket/ticket.service';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
  ) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
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

  @Get(':id/tickets')
  findAllTicketsFromEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.findAllByEventId(id);
  }
}
