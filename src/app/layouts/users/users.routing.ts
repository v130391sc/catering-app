import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { AuthGuard } from '../../shared/services/auth.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AdminGuard } from '../../shared/services/admin.guard';
import { AccountComponent } from './account/account.component';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientsComponent } from './clients/clients.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

export const UserRoutes: Routes = [
    {
        path:'account',
        component: AccountComponent
    },
    {
        path:'profile',
        component: ProfileComponent
    },
    {
        path:'my-orders',
        component: UserOrdersComponent
    },
    {
        path:'my-orders/order-detail/:id',
        component: OrderDetailComponent
    },
    {
        path:'clients',
        component: ClientsComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'product-management',
        component: ProductManagementComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'product-management/product-detail/:id',
        component: ProductDetailComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'all-orders',
        component: AllOrdersComponent,
        canActivate:[AdminGuard]
    }
];