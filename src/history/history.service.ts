import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { differenceInDays } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './entities/history.entity';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepo: Repository<History>,
    @InjectRepository(Car)
    private carRepo: Repository<Car>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateHistoryDto, userId: number) {
    const car = await this.carRepo.findOne({ where: { id: dto.carId } });
    if (!car) throw new NotFoundException('Car not found');
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.role == 'ARENDATOR') {
      throw new ForbiddenException('Arendator mashina buyurtma qila olmaydi');
    }
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (start >= end) {
      throw new ForbiddenException('endDate startDate dan keyin bo‘lishi kerak');
    }
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(car.price) * days;
    if (Number(user.balance) < totalPrice) {
      throw new ForbiddenException(`Balansingiz yetarli emas. Kerak: ${totalPrice}, mavjud: ${user.balance}`);
    }
    user.balance = Number(user.balance) - totalPrice;
    await this.userRepo.save(user);
    const history = this.historyRepo.create({
      car,
      user,
      startDate: start,
      endDate: end,
      price: totalPrice,
      status: 'PENDING',
    });

    return this.historyRepo.save(history);
  }

  async findByUserId(userId: number) {
  return this.historyRepo.find({
    where: { user: { id: userId } },
    relations: ['car'],  
    });
  }

}
