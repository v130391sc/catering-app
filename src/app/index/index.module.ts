// Core Dependencies
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexRoutes } from './index.routing';

import { ProductModule } from '../layouts/products/product.module';

// Components
import { IndexComponent } from './index.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserModule } from '../layouts/users/users.module';
import { ContactComponent } from './contact/contact.component';
import {AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
imports: [ CommonModule, FormsModule, ReactiveFormsModule, GooglePlaceModule, AgmCoreModule.forRoot({
    apiKey:'AIzaSyCCY-lyQyJtIMqfIYr3RkSlGV-FhMXj4iU'
   }), RouterModule.forChild(IndexRoutes) ],
declarations: [ IndexComponent, NavbarComponent, FooterComponent, LoginComponent, RegisterComponent, ContactComponent ],
schemas: [ NO_ERRORS_SCHEMA ],
exports: [ NavbarComponent, FooterComponent,FormsModule, ReactiveFormsModule ],
providers: []
})
export class IndexModule {}
