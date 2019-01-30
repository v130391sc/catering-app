import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http'
import { SinfotoPipe } from './pipes/sinfoto.pipe';
import { NoProductsFoundComponent } from './components/no-products-found/no-products-found.component';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule ,
		RouterModule,
	],
	declarations: [
		NoProductsFoundComponent,
		NoAccessComponent,
		PageNotFoundComponent,
		SinfotoPipe
	],
	exports: [
		NoProductsFoundComponent,
		NoAccessComponent,
		PageNotFoundComponent,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		SinfotoPipe
	],
	providers: [
		StorageService,
		ProductService,
		AuthGuard,
		AdminGuard
	]
})
export class SharedModule { }
