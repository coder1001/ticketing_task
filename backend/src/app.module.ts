import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [TicketModule, EventModule],
})
export class AppModule {}
