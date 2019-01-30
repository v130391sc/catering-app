import { Product } from './product';
export class OrderProducts {
    id?: any;
    producto:Product;
    cantidad: number;

    constructor(producto:Product, cantidad: number) {
      this.producto = producto;
      this.cantidad = cantidad;
    }
  }