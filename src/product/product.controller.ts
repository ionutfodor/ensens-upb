import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {
  }

  @Get()
  getProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number): Product {
    return this.productService.getProduct(id);
  }

  @Post()
  addProduct(@Body('product') newProduct: Product): any {
    const newId = this.productService.insertProduct(newProduct);
    return { id: newId };
  }
}
