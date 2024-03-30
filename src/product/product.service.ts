import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(newProduct: Product): number {
    newProduct.id = this.products.length + 1;
    this.products.push(newProduct);
    return newProduct.id;
  }

  getAllProducts(): Product[] {
    // return a copy, not a pointer to the list that should stay inside this
    // service; this array should only be edited through service methods
    return [...this.products];
  }

  getProduct(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found with id: ' + id + '!');
    }
    return {...product};
  }
}
