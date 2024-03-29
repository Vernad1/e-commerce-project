import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './address.model';
import { User } from '../user/user.model';
import { UserAddress } from './user-address.model';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [
    SequelizeModule.forFeature([Address, User, UserAddress]),
    UserModule,
  ],
})
export class AddressModule {}
