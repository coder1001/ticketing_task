import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  timestamp: number;
  @ApiProperty()
  city: string;
}
