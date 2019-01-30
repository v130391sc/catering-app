import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {

  cartProducts: Product[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No hay productos en el carrito';
  messageDescription = 'Por favor, añade productos';
  
  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getCartProduct();
  }
  removeCartProduct(product: Product) {
		this._productService.removeLocalCartProduct(product);

		// Recalling
		this.getCartProduct();
	}

	getCartProduct() {
		this.cartProducts = this._productService.getLocalCartProducts();
	}

  detectarCambio(cantidad:number){
    console.log(cantidad);
  }
}
