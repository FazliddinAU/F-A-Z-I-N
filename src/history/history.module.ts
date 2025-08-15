import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { History } from './entities/history.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Car, User, History])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
