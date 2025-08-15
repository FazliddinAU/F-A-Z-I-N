import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with the provided credentials',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User registered successfully',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name : { type : 'string', example : 'Ali'},
            email: { type: 'string', example: 'john.doe@example.com' },
            createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Email must be a valid email'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Get('verify')
  @ApiOperation({
    summary: 'Verify user email',
    description: 'Verifies user email using the provided verification token',
  })
  @ApiQuery({
    name: 'token',
    description: 'Email verification token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Email successfully verified',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Email verified successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid or expired token',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid or expired token' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates user and returns JWT access token',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Login successful',
        },
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'john.doe@example.com' },
            isEmailVerified: { type: 'boolean', example: true },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Email is required', 'Password is required'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('forgot-password')
  @ApiOperation({summary : "Reset link send via email"})
  forgotPassword(@Body() passwordDto : forgotPasswordDto){
    return this.authService.forgotPassword(passwordDto)
  }

  @Patch('update-password')
  @ApiOperation({summary : "Update password with token(email)"})
  updatePassword(@Body() updatePasswordDto : updatePasswordDto, @Query('token') token: string){
    return this.authService.updatePassword(updatePasswordDto, token)
  }


    @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Start Google OAuth2 login (browser only)' })
  async googleAuth() {
   
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = req.user;
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Google login successful',
      accessToken: token,
      user,
    };
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Start Facebook OAuth2 login (browser only)' })
  async facebookAuth() {

  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req) {
    const user = req.user;
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Facebook login successful',
      accessToken: token,
      user,
    };
  }
}

