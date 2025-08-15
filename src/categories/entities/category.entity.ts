import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @OneToMany(()=> Car, car=> car.category)
    cars : Car[]
}
