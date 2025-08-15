import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import envVariables from './config/envVariables';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { CarsModule } from './cars/cars.module';
import { CategoriesModule } from './categories/categories.module';
import { HistoryModule } from './history/history.module';
import { RatingsModule } from './ratings/ratings.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MailerModule.forRoot({
      transport: {
        host: envVariables.EMAIL_HOST,
        port: envVariables.EMAIL_PORT,
        secure: 'true',
        auth: {
          user: envVariables.EMAIL_USER,
          pass: envVariables.EMAIL_PASS,
        },
      },
    }),
    JwtModule.register({
      secret : envVariables.JWT_SECRET,
      signOptions : {expiresIn : envVariables.JWT_EXP_IN},
      global : true
    }),
    TypeOrmModule.forRoot({
    type : 'postgres',
    host : envVariables.DB_HOST,
    port : Number(envVariables.DB_PORT),
    username : envVariables.DB_USERNAME,
    database : envVariables.DB_NAME,
    password : envVariables.DB_PASSWORD,
    synchronize : true,
    autoLoadEntities : true
  }), AuthModule, UsersModule, CarsModule, CategoriesModule, HistoryModule, RatingsModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
