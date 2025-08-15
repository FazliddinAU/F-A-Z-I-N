import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { Category } from 'src/categories/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Car, Category])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
