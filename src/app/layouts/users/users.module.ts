// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from '../../shared/shared.module';
import { UserRoutes } from './users.routing';
import { UsersComponent } from './users.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientsComponent } from './clients/clients.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
	imports: [CommonModule, RouterModule.forChild(UserRoutes), SharedModule],
	declarations: [
        UsersComponent,
        AccountComponent,
        ProfileComponent,
        ClientsComponent,
        AllOrdersComponent,
        UserOrdersComponent,
        ProductManagementComponent,
        ProductDetailComponent,
        CreateProductComponent,
        OrderDetailComponent
	],
	exports: []
})
export class UserModule { }