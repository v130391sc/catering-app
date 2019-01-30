import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { StorageService } from '../../../shared/services/storage.service';
import { Session } from 'src/app/shared/models/session';
import { DatePipe } from '@angular/common';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mostrarNotificacion:boolean = false;
  hayError: boolean = false;
  textoNotificacion:string = "";
  userList: any[] = [];
  forma:FormGroup;
  editar:boolean = false;
  usuarioEditar:User = null;
  sessionObj :Session = new Session();
  
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
    private _authService:AuthService,
    private _userService:UserService,
    private _storageService:StorageService ) {

    this.usuarioEditar = new User();

    this.usuarioEditar = this._storageService.getCurrentUser();

    this.forma = new FormGroup({


      'nombre': new FormControl(this.usuarioEditar.nombre ,  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),

      'correo': new FormControl(this.usuarioEditar.correo,   [
                                        Validators.required,
                                        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")
                                      ]),
      'password1': new FormControl('**********', [Validators.required, Validators.minLength(5)]),
      'fechaN': new FormControl(this.usuarioEditar.fechaNacimiento,Validators.required),
      'cif': new FormControl(this.usuarioEditar.cif, Validators.required),
      'razonS': new FormControl(this.usuarioEditar.razonSocial),
      'tlf': new FormControl(this.usuarioEditar.telefono),
      'alergenos': new FormControl(this.usuarioEditar.alergenos),
      'necAlim': new FormControl(this.usuarioEditar.necesidadesAlimentacion),

    })

    this.forma.disable();
   }

  ngOnInit() {
  }

  editUser() {
    this.usuario.usuario = this.usuarioEditar.usuario;
    this.usuario.nombre = this.forma.controls['nombre'].value;
    if(this.forma.controls['password1'].value != '**********'){
      this.usuario.password = this.forma.controls['password1'].value;
    } else {
      this.usuario.password = null;
    }
    this.usuario.correo = this.forma.controls['correo'].value;
    this.usuario.fechaNacimiento = this.forma.controls['fechaN'].value;
    this.usuario.telefono = this.forma.controls['tlf'].value;
    this.usuario.cif = this.forma.controls['cif'].value;
    this.usuario.razonSocial = this.forma.controls['razonS'].value;
    this.usuario.alergenos = this.forma.controls['alergenos'].value;
    this.usuario.necesidadesAlimentacion = this.forma.controls['necAlim'].value;
    this._userServices.updateUser( this.usuario, this.usuario.usuario )
        .subscribe(data => {
            this.hayError = false;
            this.textoNotificacion = `El usuario ${this.usuario.usuario} ha sido modificado con éxito`
            this.sessionObj.token = this._storageService.getCurrentToken();
            this.sessionObj.user = this.usuario;
            this._storageService.setCurrentSession(this.sessionObj);
        }, error => {
          this.hayError=true;
          this.textoNotificacion = "Se ha producido un error";
          console.error(error)
        });
    this.forma.disable();
    this.editar = false;
    this.mostrarNotificacion = true;
    setTimeout(function(){

      this.mostrarNotificacion = false;

    }.bind(this),1500);
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

  buttonEditar(){
    this.forma.enable();
    this.editar = true;
  }

}