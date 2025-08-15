import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { userId, amount } = createPaymentDto;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    user.balance = Number(user.balance) + Number(amount);
    await this.userRepo.save(user);

    const payment = this.paymentRepo.create({
      user,
      amount,
    });

    return await this.paymentRepo.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
