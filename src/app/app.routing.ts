import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NoAccessComponent } from './shared/components/no-access/no-access.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UsersComponent } from './layouts/users/users.component';
import { UserRoutes } from './layouts/users/users.routing';

import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './shared/services/auth.guard';

export const AppRoutes: Routes = [
	// {
	// 	path: '',
	// 	children: [
	// 		// {
	// 		// 	path: '',
	// 		// 	loadChildren: './index/index.module#IndexModule'
	// 		// },
	// 		// {
	// 		// 	path: 'products',
	// 		// 	loadChildren: './layouts/products/product.module#ProductModule'
	// 		// },
	// 	]
	// },
	{
		path: 'user',
		component: UsersComponent,
		children: UserRoutes,
		canActivate:[AuthGuard]
	},
	{ path: 'no-access', component: NoAccessComponent },
	{ path: '**', component: PageNotFoundComponent }
];