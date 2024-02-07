import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './user/user.model';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.model';
import { UserAddress } from './address/user-address.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Address, UserAddress],
      autoLoadModels: true,
    }),
    UserModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
