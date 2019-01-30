import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginObject } from '../../shared/models/loginObject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted:Boolean = false;
  error:number;
  mensajeError:string;

  constructor(private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router) {
     }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
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
}
