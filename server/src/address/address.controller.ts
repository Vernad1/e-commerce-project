import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  create(@Body() addressDto: CreateAddressDto) {
    return this.addressService.createAddress(addressDto);
  }

  @Get()
  getAll() {
    return this.addressService.getAllAddress();
  }
}
