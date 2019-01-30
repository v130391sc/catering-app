import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { BreakfastComponent } from './breakfast/breakfast.component';

export const IndexRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
      {
        path: "breakfast",
        component: BreakfastComponent
      },
      {
        path: "pastry",
        component: BreakfastComponent
      }
    ]
  }
];