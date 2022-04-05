import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
  imports: [TicketModule],
})
export class EventModule {}
