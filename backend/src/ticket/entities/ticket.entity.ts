import { ApiProperty } from '@nestjs/swagger';

export class Ticket {
  @ApiProperty()
  id: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  barcode: string;
}
