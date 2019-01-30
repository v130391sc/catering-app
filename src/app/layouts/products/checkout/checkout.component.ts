import { Component, OnInit, Input, DoCheck, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { UserService } from '../../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';
import { ProductService } from '../../../shared/services/product.service';
import { createOrder } from '../../../shared/models/createOrder';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements DoCheck, OnInit {

  @Input("order") order: createOrder;

  formulario: FormGroup;
  mostrarNotificacion:boolean = false;
  hayError: boolean = false;
  textoNotificacion:string = "";
  tipoServicio: string;

  nombreUsuario:string;

  constructor(
    private _userService:UserService,
    private _productService:ProductService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _storageService:StorageService
    ) {

    this.formulario = new FormGroup({

      'direccion': new FormControl(),
      'codPostal': new FormControl(),
      'ciudad': new FormControl(),
      'provincia': new FormControl(),
      'nComensales': new FormControl(),
      'tServicio': new FormControl('', Validators.required),
      'tEvento': new FormControl(),
      'requisitos': new FormControl(),
      'comentarios': new FormControl(),

    })
   }

  ngOnInit() {}
  
  ngDoCheck() {
    this.tipoServicio = this.formulario.controls['tServicio'].value;
    if(this.tipoServicio == 'E' || this.tipoServicio == 'EC'){
      this.formulario.controls['direccion'].setValidators([
        Validators.required,
      ]);
      this.formulario.controls['codPostal'].setValidators([
        Validators.required,
      ]);
      this.formulario.controls['ciudad'].setValidators([
        Validators.required,
      ]);
      this.formulario.controls['provincia'].setValidators([
        Validators.required,
      ]);
    } else {
      this.formulario.controls['direccion'].setValidators([
      ]);
      this.formulario.controls['codPostal'].setValidators([
      ]);
      this.formulario.controls['ciudad'].setValidators([
      ]);
      this.formulario.controls['provincia'].setValidators([
      ]);
    }
    this.formulario.controls['direccion'].updateValueAndValidity();
    this.formulario.controls['codPostal'].updateValueAndValidity();
    this.formulario.controls['ciudad'].updateValueAndValidity();
    this.formulario.controls['provincia'].updateValueAndValidity();
  }

  createOrder(){
    this.nombreUsuario = this._storageService.getCurrentUser().usuario;
    this.order.pedidoCliente.direccion = this.formulario.controls['direccion'].value;
    this.order.pedidoCliente.codigoPostal = this.formulario.controls['codPostal'].value;
    this.order.pedidoCliente.ciudad = this.formulario.controls['ciudad'].value;
    this.order.pedidoCliente.provincia = this.formulario.controls['provincia'].value;
    this.order.pedidoCliente.numComensales = this.formulario.controls['nComensales'].value;
    if(this.tipoServicio == 'R'){
      this.order.pedidoCliente.tServicio = 'Recogida en tienda';
    } else if(this.tipoServicio == 'E'){
      this.order.pedidoCliente.tServicio = 'Entrega ordinaria';
    } else if(this.tipoServicio == 'EC'){
      this.order.pedidoCliente.tServicio = 'Entrega con montaje y desmontaje'
    }
    this.order.pedidoCliente.tEvento = this.formulario.controls['tEvento'].value;
    this.order.pedidoCliente.requisitos = this.formulario.controls['requisitos'].value;
    this.order.pedidoCliente.comentarios = this.formulario.controls['comentarios'].value;

    this._userService.createOrderFromClient(this.nombreUsuario, this.order)
        .subscribe(data => {
            this.hayError = false;
            this.textoNotificacion = `El pedido se ha tramitado con éxito`;
            this.formulario.reset();
            this._productService.removeCurrentCart();
            setTimeout(function(){
              this.router.navigate(['/']);        
            }.bind(this),2001);

    
        }, error => {
          this.hayError=true;
          this.textoNotificacion = "Se ha producido un error";
          console.error(error)
        });
  }
  
  cerrarModal(modal){
    $(modal).modal('hide')
    this.mostrarNotificacion = true;
    setTimeout(function(){

      this.mostrarNotificacion = false;

    }.bind(this),2000);
  }

}
