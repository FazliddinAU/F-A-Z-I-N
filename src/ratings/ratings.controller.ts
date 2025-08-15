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
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import RequestWithUser from 'src/guard/request.user';

@ApiTags('Ratings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Mashina uchun reyting qoldirish' })
  @ApiResponse({ status: 201, description: 'Reyting muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot kiritildi' })
  create(@Body() dto: CreateRatingDto, @Req() req: RequestWithUser) {
    return this.ratingsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha reytinglarni olish' })
  @ApiResponse({ status: 200, description: 'Reytinglar ro‘yxati qaytarildi' })
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Berilgan ID bo‘yicha reytingni olish' })
  @ApiResponse({ status: 200, description: 'Reyting topildi' })
  @ApiResponse({ status: 404, description: 'Reyting topilmadi' })
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Reytingni yangilash' })
  @ApiResponse({ status: 200, description: 'Reyting muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 404, description: 'Reyting topilmadi' })
  update(@Param('id') id: string, @Body() dto: UpdateRatingDto) {
    return this.ratingsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Reytingni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Reyting o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Reyting topilmadi' })
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
