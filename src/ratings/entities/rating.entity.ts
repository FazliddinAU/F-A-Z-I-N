import { Car } from "src/cars/entities/car.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=> User)
    user : User;

    @ManyToOne(()=> Car)
    car : Car;

    @Column({type : 'int'})
    stars : number;

    @Column({nullable : true})
    comment : string

    @CreateDateColumn()
    createAt : Date;
}
