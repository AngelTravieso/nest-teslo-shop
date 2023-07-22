import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService'); // Logger(context * Nombre de clase *)

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
      this.handleDBException( err )
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

  // Método general para escuchar excepciones
  private handleDBException( error: any ) {
    
    if( error. code === '23505' ){
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server errors');

  }

}
