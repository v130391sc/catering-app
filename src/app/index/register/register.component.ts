import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../shared/services/auth.service';
import { LoginObject } from 'src/app/shared/models/loginObject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mostrarNotificacion:boolean = false;
  hayError: boolean = false;
  textoNotificacion:string = "";

  userList: any[] = [];

  forma:FormGroup;
  
  usuario:User = {
    usuario: "",
    nombre: "",
    correo: "",
    fechaNacimiento: "",
    razonSocial: "",
    cif: "",
    telefono: "",
    password: "",
    tipoCliente: "",
    alergenos: "",
    necesidadesAlimentacion: "",
  }

  constructor(private _userServices:UserService, 
    private router:Router,
    private route:ActivatedRoute,
    private _authService:AuthService ) {
    this.forma = new FormGroup({


      'nombre': new FormControl('' ,  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),

      'correo': new FormControl('',   [
                                        Validators.required,
                                        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")
                                      ]),
      'username': new FormControl('', [Validators.required, Validators.minLength(5)], this.existeUsuario.bind(this)  ),
      'password1': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'password2': new FormControl(),
      'check': new FormControl('', Validators.required),
      'fechaN': new FormControl('', Validators.required),
      'cif': new FormControl('', Validators.required),
      'razonS': new FormControl(),
      'tlf': new FormControl(),
      'alergenos': new FormControl(),
      'necAlim': new FormControl(),
      
    })

    // this.forma.setValue( this.usuario );

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);


    this.forma.controls['username'].valueChanges
        .subscribe(  data =>{
          // console.log(data);
        })

    this.forma.controls['username'].statusChanges
        .subscribe(  data =>{
          // console.log(data);
          })
   }

  ngOnInit() {
  }

  addUser() {
    this.usuario.usuario = this.forma.controls['username'].value;
    this.usuario.nombre = this.forma.controls['nombre'].value;
    this.usuario.password = this.forma.controls['password1'].value;
    this.usuario.correo = this.forma.controls['correo'].value;
    this.usuario.fechaNacimiento = this.forma.controls['fechaN'].value;
    this.usuario.telefono = this.forma.controls['tlf'].value;
    this.usuario.cif = this.forma.controls['cif'].value;
    this.usuario.razonSocial = this.forma.controls['razonS'].value;
    this.usuario.alergenos = this.forma.controls['alergenos'].value;
    this.usuario.necesidadesAlimentacion = this.forma.controls['necAlim'].value;
    this._userServices.createUser( this.usuario )
        .subscribe(data => {
            this.hayError = false;
            this.textoNotificacion = `El usuario ${this.usuario.usuario} ha sido añadido con éxito`;
            this.forma.reset();
            this.router.navigate(['/login']);
    
        }, error => {
          this.hayError=true;
          this.textoNotificacion = "Se ha producido un error";
          console.error(error)
        });
  }
  
  noIgual( control: FormControl ): { [s:string]:boolean }  {

    // console.log(this);
    let forma:any = this;

    if( control.value !== forma.controls['password1'].value ){
      return {
        noiguales:true
      }
    }

    return null;

  }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any>{
    this._userServices.getUsers().subscribe(data => {
      this.userList = data;
    })
    let promesa = new Promise(
      ( resolve, reject )=>{
        setTimeout(() => {

        for (let i = 0; i < this.userList.length; i++){
          if(this.userList[i].usuario == control.value){
            resolve({ existe:true} )
          }
        }

        resolve( null )

      },1000);


      }
    )

    return promesa;

  }

  cerrarModal(modal){
    $(modal).modal('hide')
    this.mostrarNotificacion = true;
    setTimeout(function(){

      this.mostrarNotificacion = false;

    }.bind(this),2500);
  }

}
