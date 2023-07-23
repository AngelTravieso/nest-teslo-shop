import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Product, ProductImage } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([
      // Aquí se le indica a TypeORM las entidades que tengo para el módulo
      Product,
      ProductImage,
    ]),
  ]
})
export class ProductsModule {}
