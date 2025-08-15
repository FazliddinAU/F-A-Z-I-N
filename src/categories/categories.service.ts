import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category)
 private cateRepo : Repository<Category>){}
  async create(createCategoryDto: CreateCategoryDto) : Promise<Category>{
    const existCategory = await this.cateRepo.findOne({where : {name : createCategoryDto.name }})
    if(existCategory){
      throw new ForbiddenException('Bunday nomli category mavjud.')
    }
    const newCategory = this.cateRepo.create(createCategoryDto)
    await this.cateRepo.save(newCategory)
    return newCategory
  }

  async findAll() : Promise<Category[]>{
    return this.cateRepo.find();
  }

  async findOne(id: number) : Promise<Category>{
    const category = await this.cateRepo.findOne({where : {id}})
    if(!category){
      throw new NotFoundException('Category topilmadi')
    }
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) : Promise<Category>{
    const category = await this.cateRepo.findOne({where : {id}})
    if(!category){
      throw new NotFoundException('Category topilmadi')
    }
    const updateCategory = await this.cateRepo.preload({
      id,
      ...updateCategoryDto
    })
    if(!updateCategory){
      throw new BadRequestException('Category yangilashda xatolik yuz berdi')
    }
    await this.cateRepo.save(updateCategory)
    return category
  }

  async remove(id: number) : Promise<void>{
    await this.cateRepo.delete(id);
  }
}
