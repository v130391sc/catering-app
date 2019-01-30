import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartProductsComponent } from './cart-products/cart-products.component';

export const ProductRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'products/all-products',
				component: ProductListComponent
			},
			{
				path: 'products/cart-items',
				component: CartProductsComponent
			},
      		{
				path: 'product/:termino',
				component: ProductListComponent
			}
		]
	}
];
