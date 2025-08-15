import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/entities/car.entity";
import { History } from "src/history/entities/history.entity";
import { Payment } from "src/payments/entities/payment.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @ApiProperty({ example : "Ali", minimum : 3, maximum : 30})
    @Column()
    name : string
    
    @Column({ type:"enum", enum : Roles, default : Roles.USER})
    role : Roles

    @ApiProperty({ example : "ali0110@gmail.com", minimum : 10, maximum : 120})
    @Column()
    email : string

    @ApiProperty({ example : "ali$8347", minimum : 6, maximum : 15})
    @Column()
    password : string

    @Column({ nullable : true })
    balance : number
    
    @OneToMany(() => History, history => history.user)
    history: History[];

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];
}
