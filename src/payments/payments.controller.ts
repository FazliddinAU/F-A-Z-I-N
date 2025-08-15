import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import { Roles } from 'src/guard/roles.decorator';

@UseGuards(AuthGuard)
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Post()
  @ApiCreatedResponse({ description: 'To‘lov yaratildi', type: Payment })
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }
  @Roles('SUPER_ADMIN', 'ADMIN')
  @Get()
  @ApiOkResponse({ description: 'Barcha to‘lovlar', type: [Payment] })
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }
}
