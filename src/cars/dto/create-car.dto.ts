import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
  @ApiProperty({ example: 'Tesla Model 3' })
  name: string;
   @ApiProperty({ example: '2025' })
  model: string;
  @ApiProperty({ example: 100 })
  price : number
  @ApiProperty({ example: 120 })
  priceDay: number;
  @ApiProperty({ example: 'Electric, autopilot, long range' })
  description: string;
  @ApiProperty({ example: 1 })
  categoryId: number;
}
