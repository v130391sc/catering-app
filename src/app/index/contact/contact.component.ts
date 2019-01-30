import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { Email } from '../../shared/models/email';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  mostrarNotificacion:boolean = false;
  hayError: boolean = false;
  textoNotificacion:string = "";
  formulario:FormGroup;
  editar:boolean = false;

  email:Email = {
    nombre:"",
    email:"",
    telefono:"",
    asunto:"",
    compania:"",
    mensaje:""
  }

  zoom: number = 15;
  
  // initial center position for the map
  lat: number = 40.40463233806925;
  lng: number = -3.839646577835083;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private _userService:UserService) {


    this.formulario = new FormGroup({


      'nombre': new FormControl('' ,Validators.required),

      'correo': new FormControl('',   [
                                        Validators.required,
                                        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")
                                      ]),
      'telefono': new FormControl('' ,Validators.required),
      'compania': new FormControl(),
      'asunto': new FormControl('' ,Validators.required),
      'mensaje': new FormControl('' ,Validators.required),

    })

   }
   
   markers: marker[] = [
     {
       lat: 40.40463233806925,
       lng: -3.839646577835083,
       label: 'UPM',
       draggable: true
     }
   ]

  ngOnInit() {
  }

  editUser() {

    this.email.nombre = this.formulario.controls['nombre'].value;
    this.email.email = this.formulario.controls['correo'].value;
    this.email.telefono = this.formulario.controls['telefono'].value;
    this.email.compania = this.formulario.controls['compania'].value;
    this.email.asunto = this.formulario.controls['asunto'].value;
    this.email.mensaje = this.formulario.controls['mensaje'].value;
  
    this._userService.enviarCorreo(this.email)
        .subscribe(data => {
            this.hayError = false;
            this.textoNotificacion = `Su mensaje se ha enviado con éxito`
        }, error => {
          this.hayError=true;
          this.textoNotificacion = "Se ha producido un error";
          console.error(error)
        });
    this.mostrarNotificacion = true;
    setTimeout(function(){

      this.mostrarNotificacion = false;

    }.bind(this),1500);
  }
  
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}