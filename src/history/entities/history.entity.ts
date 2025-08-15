import { Car } from "src/cars/entities/car.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.history, { eager: true })
  user: User;

  @ManyToOne(() => Car, car => car.history, { eager: true })
  car: Car;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ nullable: true })
  status: 'PENDING' | 'ACTIVE' | 'FINISHED' | 'CANCELED'; 
}
