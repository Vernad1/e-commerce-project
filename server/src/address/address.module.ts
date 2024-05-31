import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './address.model';
import { User } from '../user/user.model';
import { UserModule } from '../user/user.module';
import { ShopOrder } from 'src/shop-order/shop-order.model';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
<<<<<<< Updated upstream
  imports: [
    SequelizeModule.forFeature([Address, User, UserAddress]),
    UserModule,
  ],
=======
  imports: [SequelizeModule.forFeature([Address, User, ShopOrder]), UserModule],
>>>>>>> Stashed changes
})
export class AddressModule {}
