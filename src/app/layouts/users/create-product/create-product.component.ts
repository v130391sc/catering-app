import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { Ingredient } from '../../../shared/models/ingredientes';
import { Observable } from 'rxjs/Rx';
import bsCustomFileInput from 'bs-custom-file-input';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  mostrarNotificacion:boolean = false;
  hayError: boolean = false;
  textoNotificacion:string = "";
  nombreUsuario:string;

  ingredientList:Ingredient[] = [];

  form:FormGroup;

  formIng:FormGroup;

  ingrediente:Ingredient = {
    nombre: "",
    marca: "",
    alergenos: "no",
  }
  
  producto:Product = {
    nombre: "",
    costeUnidad: 0,
    disp: "",
    nombreImg: "",
    listaIngredientes: []
  }

  constructor(private _productService:ProductService, 
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _storageService:StorageService) {

      this.nombreUsuario = this._storageService.getCurrentUser().usuario;

    this.form = new FormGroup({

      
      'nombreP': new FormControl('' ,  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),
      'costeUnidad': new FormControl('', Validators.required),
      'disponibilidad': new FormControl('', Validators.required),
      'uploadFile': new FormControl('', Validators.required)
      
    })

    this.formIng = new FormGroup({
      'nombreI': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      'marca': new FormControl('', Validators.required),
      'alergenos': new FormControl('', Validators.required)
    })
   }

  ngOnInit() {
    bsCustomFileInput.init();
  }

  addProduct() {
    this.producto.nombre = this.form.controls['nombreP'].value;
    this.producto.costeUnidad = this.form.controls['costeUnidad'].value;
    this.producto.disp = this.form.controls['disponibilidad'].value;
    this.producto.nombreImg = this.form.controls['uploadFile'].value;
    this.producto.nombreImg = this.producto.nombreImg.substring(this.producto.nombreImg.lastIndexOf("\\")+1, this.producto.nombreImg.length );
    this.producto.listaIngredientes = this.ingredientList;
    this._productService.createProduct(this.producto, this.nombreUsuario)
            .subscribe(data => {
              this.hayError = false;
              this.textoNotificacion = `El producto ha sido añadido con éxito`;
              this.form.reset();
              this.ingredientList = [];
              this.router.navigate['/user/product-management'];
            }, error => {
              this.hayError=true;
              this.textoNotificacion = "Se ha producido un error";
              console.error(error)
            });
  }

  addIngredient() {
    this.ingredientList.push(new Ingredient(this.formIng.controls['nombreI'].value, 
    this.formIng.controls['marca'].value,
    this.formIng.controls['alergenos'].value));
    console.log( this.ingredientList );
    this.formIng.reset();
  }

  borrarIngrediente(index:number){
    this.ingredientList.splice(index,1);
  }

  cerrarModal(modal){
    $(modal).modal('hide')
    this.mostrarNotificacion = true;
    setTimeout(function(){

      this.mostrarNotificacion = false;

    }.bind(this),2500);
  }

}
