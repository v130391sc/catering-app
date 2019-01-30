import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FooterComponent } from './index/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { NoAccessComponent } from './shared/components/no-access/no-access.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './layouts/users/users.module';
import { ProductModule } from './layouts/products/product.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  IndexModule,
  SharedModule,
  UserModule,
  ProductModule,
  RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
