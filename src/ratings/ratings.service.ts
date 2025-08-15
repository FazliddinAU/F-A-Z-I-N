import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
    @InjectRepository(Car)
    private carRepo: Repository<Car>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createRatingDto: CreateRatingDto, userId: number) {
    const car = await this.carRepo.findOne({ where: { id: createRatingDto.carId } });
    if (!car) throw new NotFoundException('Car not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const rating = this.ratingRepo.create({
      car,
      user,
      stars: createRatingDto.stars,
      comment: createRatingDto.comment,
    });

    return this.ratingRepo.save(rating);
  }

  findAll() {
    return this.ratingRepo.find({ relations: ['car', 'user'] });
  }

  findOne(id: number) {
    return this.ratingRepo.findOne({ where: { id }, relations: ['car', 'user'] });
  }

  async update(id: number, dto: UpdateRatingDto) {
    const rating = await this.ratingRepo.findOne({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');

    Object.assign(rating, dto);
    return this.ratingRepo.save(rating);
  }

  async remove(id: number) {
    const rating = await this.ratingRepo.findOne({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');
    return this.ratingRepo.remove(rating);
  }
}
