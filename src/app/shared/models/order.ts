import { OrderProducts } from './orderProducts';
export class Order {
    id?: number;
    fechaPedido?:string;
    fechaEntrega?: string;
    direccion: string;
    codigoPostal: string;
    ciudad: string;
    provincia: string;
    numComensales?: number;
    tEvento:string;
    tServicio?: string;
    requisitos: string;
    comentarios: string;
    precio: number;
    listaProductosPedido?: OrderProducts[];
  }