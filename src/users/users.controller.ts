import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import RequestWithUser from 'src/guard/request.user';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import { UpdatePasswordDto } from './dto/update-password';
import { Roles } from 'src/guard/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAll() {
      return this.usersService.findAll();
  }
  @Patch('make-admin/:userId')
  @Roles('SUPER_ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Userni admin qilish (faqat SUPER_ADMIN)' })
  @ApiResponse({ status: 200, description: 'User admin qilindi' })
  @ApiResponse({ status: 404, description: 'User topilmadi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q' })
  makeAdmin(@Param('userId') userId: string) {
    return this.usersService.makeAdmin(+userId);
  }

  @Patch('make-arendator/:userId')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Userni arendator qilish' })
  @ApiResponse({ status: 200, description: 'User admin qilindi' })
  @ApiResponse({ status: 404, description: 'User topilmadi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q' })
  makeArentador(@Param('userId') userId: string) {
    return this.usersService.makeAdmin(+userId);
  }

  @Get('myprofile')
  @ApiOperation({ summary: 'Foydalanuvchi profilini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi profili' })
  get(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.usersService.getProfile(userId);
  }

  @Patch('myprofile')
  @ApiOperation({ summary: 'Profil maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Profil yangilandi' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @Delete('myprofile')
  @ApiOperation({ summary: 'Profilni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Profil o‘chirildi' })
  delete(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.usersService.deleteProfile(userId);
  }

  @Patch('new/password')
  @ApiOperation({ summary: 'Parolni yangilash' })
  @ApiResponse({ status: 200, description: 'Parol yangilandi' })
  @ApiBody({ type: UpdatePasswordDto })
  updateed(
    @Req() req: RequestWithUser,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updatePassword(userId, updatePasswordDto);
  }
}
