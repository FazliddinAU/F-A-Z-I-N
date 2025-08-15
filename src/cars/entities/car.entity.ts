import { Category } from "src/categories/entities/category.entity";
import { History } from "src/history/entities/history.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    model : string

    @Column()
    description : string

    @Column({nullable : true})
    image : string

    @Column('decimal')
    price : number
    
    @Column()
    priceDay : number

    @Column()
    createdBy : number

    @ManyToOne(()=> Category, category => category.cars)
    category : Category;

    @ManyToOne(()=> User, user => user.id)
    owner : User;

    @OneToMany(() => History, history => history.car)
    history: History[];
}
