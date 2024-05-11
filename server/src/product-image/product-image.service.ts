import { Injectable } from '@nestjs/common';
import { CreateProductImage } from './dto/create-product-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImage } from './product-image.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectModel(ProductImage) private imageRepository: typeof ProductImage,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateProductImage, image: any) {
    const fileName = await this.filesService.createFile(image);
    const productImage = await this.imageRepository.create({
      ...dto,
      image: fileName,
    });

    return productImage;
  }

  async getAll() {
    const productImage = await this.imageRepository.findAll();
    return productImage;
  }
}
