export class Product {
  id?: number;
  name: string;
  description?: string;
  price: number;

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}