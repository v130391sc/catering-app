// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { ProductRoutes } from './product.routing';

// Components
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
	imports: [CommonModule, SharedModule, RouterModule.forChild(ProductRoutes)],
	declarations: [
		ProductsComponent,
		ProductListComponent,
		CartProductsComponent,
		CartCalculatorComponent,
		CheckoutComponent
	],
	exports: []
})
export class ProductModule { }