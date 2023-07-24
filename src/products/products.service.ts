import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { Product, ProductImage } from './entities';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService'); // Logger(context * Nombre de clase *)

  // Recomendado usar patrón repository para trabajar con la BD
  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>,

    @InjectRepository( ProductImage )
    private readonly productImageRepository: Repository<ProductImage>

  ){}

  async create(createProductDto: CreateProductDto) {
    
    try {

      // Si no viene el slug lo tomamos del titulo  // * Ahora está en el BeforeInsert del entity
      // if( !createProductDto.slug ) {
      //   createProductDto.slug = createProductDto.title
      //     .toLocaleLowerCase()
      //     .replaceAll(' ', '_')
      //     .replaceAll("'", '');
      // } else {
      //   createProductDto.slug = createProductDto.slug
      //     .toLocaleLowerCase()
      //     .replaceAll(' ', '_')
      //     .replaceAll("'", '');
      // }

      const { images = [], ...productDetails } = createProductDto;

      // creamos el registro en memoria, con el ID y todo
      const product = this.productRepository.create({
        ...productDetails, // Exparsir las propiedades del createProdutDto
        images: images.map( image => this.productImageRepository.create({ url: image }) ),
      });

      // Luego lo grabo e impacto la BD
      await this.productRepository.save( product );

      // Regreso el producto creado
      return { ...product, images }; // Regresar las mismas imágenes que envia el front(les quito el ID de BD)

    } catch(err) {
      this.handleDBException( err )
    }

  }

  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return await this.productRepository.find({
      take: limit, // toma lo que viene en el limit
      skip: offset, // saltate los que diga mi offset
      // TODO: relaciones
    });
  }

  async findOne( term: string ) {

    let product: Product;

    // Si el término de búsqueda es un UUID
    if( isUUID( term ) ) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      // Buscar por slug
      // product = await this.productRepository.findOneBy({ slug: term });
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
      // (:=) indica que son argumentos que se le van a proporcionar al query
        .where('UPPER(title) =:title or slug =:slug', { // debe ir pegado =:title (el campo)
          title: term.toLocaleUpperCase(),
          slug: term.toLowerCase(),
        }).getOne(); // obtener solo un registro
    }
    
    // const product = await this.productRepository.findOneBy({ term });

    if(!product) {
      throw new NotFoundException(`Product with ${ term } not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    /*
    preload => crea una entidad de un objeto plano JavaScript, si la entidad existe en la BD, entonces la carga (y todo lo relacionado a ella) reemplazando todos los valores con los nuevos facilitados en el objeto JavaScript y retorna la nueva entidad
    */
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
      images: [],
    });

    if( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);

    try {
      await this.productRepository.save( product );
      return product;
    } catch(err) {
      this.handleDBException(err);
    }

  }

  async remove(id: string) {

    /*
    delete => ejecuta un query de eliminación rápido y eficiente
    no verifica que la entidad este en la BD
    */
    const { affected } = await this.productRepository.delete( id );

    if( affected === 0 ) {
      throw new BadRequestException(`Product with ID ${ id } not found`);
    }

    // Otra manera de hacerlo
    // const product = await this.findOne( id );
    // await this.productRepository.remove( product );

    return;
    
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
