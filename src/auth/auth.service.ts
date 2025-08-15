import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import envVariables from 'src/config/envVariables';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailerService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { email } = registerAuthDto;
    const eUser = await this.userService.getByEmail(email);
    if (eUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const payload = registerAuthDto;
    const token = this.jwtService.sign(payload);
    await this.sendEmailVerification(email, token);

    return {
      message: 'Please check your email to verify your account',
    };
  }

  async verifyEmail(token: string) {
    const payload = this.jwtService.verify(token);
    if (!payload) {
      throw new BadRequestException('Invalid token');
    }
    const user = await this.userService.create(payload);
    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });
    return {
      message: 'Email verified successfully',
      accessToken,
      user,
    };
  }

  async login(loginAuthDto: LoginDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });
    return {
      message: 'Login successful',
      accessToken,
      user,
    };
  }

  sendEmailVerification(email: string, token: string) {
    return this.mailService.sendMail({
      to: email,
      subject: 'F A Z I N | ', 
      html: `<p><b>Assalomu alaykum ushbu havolani bosish orqali o'z hisobingizni tasdiqlaysiz.</b></p>
      <a href="http://${envVariables.FRONTED_URL}:3000/api/v2/auth/verify?token=${token}" style="padding: 20px; background : blue; color : #fff;">Tasdiqlash</a>
      `,
    });
  }

    sendEmailPassword(email: string, token: string) {
    return this.mailService.sendMail({
      to: email,
      subject: 'F A Z I N |', 
      html: `<p><b>Assalomu alaykum ushbu havolani bosish orqali o'z hisobingizni tasdiqlaysiz.</b></p><br>
      <a href="http://${envVariables.FRONTED_URL}:3000/api/v2/auth/update-password?token=${token}" style="padding: 20px; background : blue; color : #fff">Tasdiqlash</a>
      `,
    });
  }

  async forgotPassword (passwordDto : forgotPasswordDto){
    const { email } = passwordDto;
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    const payload = passwordDto;
    const token = this.jwtService.sign(payload);
    await this.sendEmailPassword(email, token)
    return 'Yuborildi'
  }
async updatePassword(updatePasswordDto: updatePasswordDto, token: string) {
  const payload = this.jwtService.verify(token);
  if (!payload || !payload.email) {
    throw new BadRequestException('Invalid token');
  }

  const { newPassword, tryPassword } = updatePasswordDto;

  if (newPassword !== tryPassword) {
    throw new BadRequestException('Yangi parollar bir xil bo‘lishi kerak');
  }

  await this.userService.updateUserPasswordByEmail(payload.email, newPassword);

  return {
    message: 'Parol muvaffaqiyatli yangilandi',
  };
}

}
