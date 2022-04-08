import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiCreatedResponse({ type: Ticket })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Ticket {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOkResponse({ type: Ticket, isArray: true })
  @Get()
  findAll(): Ticket[] {
    return this.ticketService.findAll();
  }

  @ApiOkResponse({ type: Ticket })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Ticket {
    return this.ticketService.findOne(id);
  }

  @ApiOkResponse({ type: Ticket })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Ticket {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.remove(id);
  }
}
