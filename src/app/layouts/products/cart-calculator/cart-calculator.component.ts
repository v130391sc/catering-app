import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, DoCheck } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { Order } from '../../../shared/models/order';
import { OrderProducts } from '../../../shared/models/orderProducts';
import { StorageService } from '../../../shared/services/storage.service';
import { createOrder } from '../../../shared/models/createOrder';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cart-calculator',
	templateUrl: './cart-calculator.component.html',
	styleUrls: [ './cart-calculator.component.css' ]
})
export class CartCalculatorComponent implements DoCheck, OnInit, OnChanges {
  @Input() products: Product[];
	productos:Product[] = this.products;
	
	productoPedido: OrderProducts = {
		producto: null,
		cantidad: null,
	}

	order: createOrder = {
		pedidoCliente: {
			direccion: "",
			codigoPostal:"",
			ciudad:"",
			provincia:"",
			numComensales: null,
			tEvento: "",
			tServicio: "",
			requisitos: "",
			comentarios: "",
			precio: null,
			listaProductosPedido: []
		},
		cantidadProductos: []
	}
	totalValue = 0;
	isAdmin:boolean = false;

	constructor(private _storageService:StorageService,
		private router:Router) {
	}

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.products;

		const products: Product[] = dataChanges.currentValue;
		this.totalValue = 0;
		products.forEach((product) => {
			this.totalValue += product.costeUnidad*product.contador;
		});
	}

  ngOnInit() {}
  
  ngDoCheck() {
    if(this.productos !== this.products){
			
			this.totalValue = 0;
      this.products.forEach((product) => {
				product.contador = Number(product.contador);
				this.totalValue += product.costeUnidad*product.contador;
      });
		}
	}
	
	crearPedido(){
		if(this._storageService.getCurrentUser() == null){
			this.router.navigate(['/login']);
		  }
		this.order.pedidoCliente.precio = this.totalValue;
		this.order.cantidadProductos = [];
		this.products.forEach((product) => {
			this.order.cantidadProductos.push(new OrderProducts(product, product.contador));
		});
	}
}