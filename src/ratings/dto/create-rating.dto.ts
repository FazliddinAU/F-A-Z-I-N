import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({example : '4'})
  @IsInt()
  carId: number;

  @ApiProperty({example : '5'})
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @ApiProperty({example : 'menga yoqdi va sizga ham tavsiya beraman'})
  @IsOptional()
  @IsString()
  comment?: string;
}