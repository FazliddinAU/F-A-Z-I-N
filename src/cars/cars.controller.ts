import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCarWithImageDto } from './dto/create-car-with-image.dto';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import RequestWithUser from 'src/guard/request.user';
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Roles('ADMIN', 'SUPER_ADMIN', 'ARENDATOR')
  @Post()
  @ApiOperation({ summary: 'Create a car with image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Car with image',
    type: CreateCarWithImageDto,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/cars',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCarDto: CreateCarDto,
    @Req() req: RequestWithUser
  ) {
    return this.carsService.create(createCarDto, req.user.id, file?.filename);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
  @Roles('ADMIN', 'SUPER_ADMIN', 'ARENDATOR')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto, @Req() req: RequestWithUser) {
    return this.carsService.update(+id, updateCarDto, req.user);
  }
  @Roles('ADMIN', 'SUPER_ADMIN', 'ARENDATOR')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.carsService.remove(+id, req.user);
  }
}
