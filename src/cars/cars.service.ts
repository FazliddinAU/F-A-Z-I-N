import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ){}
  async create(dto: CreateCarDto, userId: number, imageFilename?: string) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const car = this.carRepo.create({
      ...dto,
      image: imageFilename,
      category,
      createdBy : userId
    });

    return this.carRepo.save(car);
  }

  async findAll() : Promise<Car[]>{
    return this.carRepo.find();
  }

  async findOne(id: number) : Promise<Car>{
    const car = await this.carRepo.findOne({where : {id}})
    if(!car){
      throw new NotFoundException('Car topilmadi')
    }
    return car
  }

  async update(id: number, dto: UpdateCarDto, user: { id: number; role: string }) {
    const car = await this.carRepo.findOne({ where: { id } });
    if (!car) throw new NotFoundException('Car not found');
    if (user.role === 'ARENDATOR' && car.createdBy !== user.id ) {
      throw new ForbiddenException(`Siz faqat o'zingiz qo'shgan mashinalarni tahrirlay olasiz`);
    }
    Object.assign(car, dto);
    return this.carRepo.save(car);
  }

  async remove(id: number, user: { id: number; role: string }) {
    const car = await this.carRepo.findOne({ where: { id } });
    if (!car) throw new NotFoundException('Car not found');
    if (user.role === 'ARENDATOR' &&car.createdBy !== user.id) {
      throw new ForbiddenException(`Siz faqat o'zingiz qo'shgan mashinalarni o'chira olasiz`);
    }
    return this.carRepo.remove(car);
  }

}
