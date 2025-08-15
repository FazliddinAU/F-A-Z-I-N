import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty({
    example: 1,
    description: 'Arendaga olinayotgan mashinaning ID raqami',
  })
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @ApiProperty({
    example: '2025-08-15T10:00:00.000Z',
    description: 'Arenda boshlanish vaqti (ISO formatda)',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '2025-08-17T10:00:00.000Z',
    description: 'Arenda tugash vaqti (ISO formatda)',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
