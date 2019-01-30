import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Product } from '../../../shared/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from '../../../shared/models/ingredientes';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id:number;
  nombreUsuario:string;

  productDetail:Product;

  editar:boolean = false;
  mostrarNotificacion:boolean = false;
  hayError: boolean = false;
  textoNotificacion:string = "";

  ingredientList:Ingredient[] = [];

  form:FormGroup;

  formIng:FormGroup;

  ingrediente:Ingredient = {
    nombre: "",
    marca: "",
    alergenos: "no",
  }
  
  product:Product= {
    nombre:"",
    costeUnidad:0,
    disp:"si",
    nombreImg:"",
    listaIngredientes: []
  
  }

  dataCargada:boolean = false;

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private _productService:ProductService,
    private _storageService:StorageService) { 
    this.activatedRoute.params
    .subscribe( parametros=>{
      this.nombreUsuario = this._storageService.getCurrentUser().usuario;
      this.id = parametros['id']
      this._productService.getProductAdmin(this.nombreUsuario, this.id).subscribe(data => {
          this.productDetail = data;
          this.ingredientList = this.productDetail.listaIngredientes;
          this.dataCargada = true;
          this.form = new FormGroup({

      
            'nombreP': new FormControl(this.productDetail.nombre,[
                                                Validators.required,
                                                Validators.minLength(3)
                                              ]),
            'costeUnidad': new FormControl(this.productDetail.costeUnidad,Validators.required),
            'disponibilidad': new FormControl(this.productDetail.disp,Validators.required),
            'uploadFile': new FormControl()
            
          })
      
          this.form.disable();
      })
  });

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

modifyProduct(){
  this.product.nombre = this.form.controls['nombreP'].value;
  this.product.costeUnidad = this.form.controls['costeUnidad'].value;
  this.product.disp = this.form.controls['disponibilidad'].value;
  if(this.form.controls['uploadFile'].value){
    this.product.nombreImg = this.form.controls['uploadFile'].value;
    this.product.nombreImg = this.product.nombreImg.substring(this.product.nombreImg.lastIndexOf("\\")+1, this.product.nombreImg.length );
  } else {
    this.product.nombreImg = this.productDetail.nombreImg.substring(this.productDetail.nombreImg.lastIndexOf("/")+1, this.productDetail.nombreImg.length );
  }
  this.product.listaIngredientes = this.ingredientList;
  this._productService.updateProduct(this.product, this.nombreUsuario, this.id)
      .subscribe(data => {
        this.hayError = false;
        this.textoNotificacion = `El producto ha sido modificado con éxito`
      }, error => {
        this.hayError=true;
        this.textoNotificacion = "Se ha producido un error";
        console.error(error)
      });
      this.form.disable();
      this.editar = false;
      this.mostrarNotificacion = true;
      setTimeout(function(){
  
        this.mostrarNotificacion = false;
  
      }.bind(this),1500);
}

addIngredient() {
  this.ingredientList.push(new Ingredient(this.formIng.controls['nombreI'].value, 
  this.formIng.controls['marca'].value,
  this.formIng.controls['alergenos'].value));
  this.formIng.reset();
}

borrarIngrediente(index:number){
  this.ingredientList.splice(index,1);
}

cerrarModal(modal){
  $(modal).modal('hide')
}

buttonEditar(){
  this.form.enable();
  this.editar = true;
}

iniciarUpload(){
  bsCustomFileInput.init();
}

}
