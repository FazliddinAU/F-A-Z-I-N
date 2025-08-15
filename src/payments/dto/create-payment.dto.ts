import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({example : '5'})
  userId: number;

  @ApiProperty({example : '100000'})
  amount: number;
}
