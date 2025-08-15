import { ApiProperty } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';

export class CreateCarWithImageDto extends CreateCarDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}