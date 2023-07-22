import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  // Recomendado usar patrón repository para trabajar con la BD
  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    
    try {

      // creamos el registro en memoria, con el ID y todo
      const product = this.productRepository.create( createProductDto );

      // Luego lo grabo e impacto la BD
      await this.productRepository.save( product );

      // Regreso el producto creado
      return product;

    } catch(err) {
      console.log(err);
      throw new InternalServerErrorException('Ayuda!');
    }

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
