import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  timestamp: number;
  @ApiProperty()
  city: string;
}
