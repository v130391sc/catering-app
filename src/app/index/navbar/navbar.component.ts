import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { StorageService } from '../../shared/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LoginObject } from 'src/app/shared/models/loginObject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  
  user:string = null;
  public loginForm: FormGroup;
  public submitted:Boolean = false;
  error:number;
  mensajeError:string;
  isAdmin:boolean = false;

  contadorProductos:number;

  constructor(private router:Router, 
    public _productService:ProductService,
    private _storageService:StorageService,
    private formBuilder: FormBuilder,
    private _authService: AuthService) {
     }

     ngOnInit() {
      this.loginForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required],
      })
    }

    ngDoCheck(){
      this.contadorProductos = this._productService.navbarCartCount;
    }
  
    submitLogin() {
      this.submitted = true;
      this.error = null;
      if(this.loginForm.valid){
        this._authService.login(new LoginObject(this.loginForm.value)) 
        .subscribe(res=>{
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.error=2;
          console.log(this.error);
          this.mensajeError = "Usuario y contraseña incorrectos";
        });
      }
    }

  public buscarProducto( termino:string ){
    this.router.navigate(['/product', termino]);
  }

  esAdmin(): boolean {
    if(this._storageService.isAuthenticated()){
      this.user = this._storageService.getCurrentUser().usuario;
    }
    return this._storageService.isAuthenticated();
  }
  userAdmin():boolean{
    if(this._storageService.isAuthenticated()){
      return this.isAdmin = this._storageService.isAdmin();
    }
  }

  logout(): void{
    this._storageService.logout();
  }
}
