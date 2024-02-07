import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Address } from '../address/address.model';
import { UserAddress } from '../address/user-address.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Address, UserAddress])],
  exports: [UserService],
})
export class UserModule {}
