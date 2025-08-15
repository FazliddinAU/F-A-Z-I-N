import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address for the user account',
    example: 'fazliddinauu@gmail.com',
    format: 'email',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'SecurePassword123!',
    minLength: 8,
    maxLength: 128,
  })
  password: string;
}
