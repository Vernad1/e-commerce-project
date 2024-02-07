import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
    private userService: UserService,
  ) {}
  async createAddress(dto: CreateAddressDto) {
    const address = await this.addressRepository.create(dto);
    const user = await this.userService.getUserById(dto.userId);
    await user.$set('address', [address]);
    return address;
  }
  async getAllAddress() {
    const addresses = await this.addressRepository.findAll();
    return addresses;
  }
}
