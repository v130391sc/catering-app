import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  mostrarNotificacion:boolean = false;
  productName:string = "";
  mostrarMenu: boolean = false;
  productList: Product[] = [];
  loading = false;
  termino:string="";

  constructor( private activatedRoute:ActivatedRoute, private _productService:ProductService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params =>{
      this.getAllProducts(params['termino']);

    });

  }

  increment(product){
    product.contador += 1;
  }
    
  decrement(product){
    if (product.contador > 0) {
      product.contador -= 1;
    } else {
      product.contador = 0;
    }
  }

  public mostrarBuscadorAvanzado() {
    if(this.mostrarMenu == true){
      this.mostrarMenu = false;
    } else {
      this.mostrarMenu = true;
    }
  }

  getAllProducts(termino?:string, pMin?:number, pMax?:number){
    this.termino = termino;
    this.loading = true;
    if(termino!==undefined && (pMin == 0 || pMin===undefined) && (pMax == 0 || pMax===undefined)){
      this._productService.getProducts(termino).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else if(termino!==undefined && (pMin == 0 || pMin===undefined) && (pMax != 0 || pMax!==undefined)){
      this._productService.getProducts(termino, undefined, pMax).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else if(termino!==undefined && (pMin != 0 || pMin!==undefined) && (pMax != 0 || pMax!==undefined)){
      this._productService.getProducts(termino, pMin, pMax).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else if(termino===undefined && (pMin != 0 || pMin!==undefined) && (pMax != 0 || pMax!==undefined)){
      this._productService.getProducts(undefined, pMin, pMax).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else if(termino===undefined && (pMin == 0 || pMin===undefined) && (pMax != 0 || pMax!==undefined)){
      this._productService.getProducts(undefined, undefined, pMax).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else if(termino===undefined && (pMin != 0 || pMin!==undefined) && (pMax == 0 || pMax===undefined)){
      this._productService.getProducts(undefined, pMin, undefined).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else if(termino!==undefined && (pMin != 0 || pMin!==undefined) && (pMax == 0 || pMax===undefined)){
      this._productService.getProducts(termino, pMin).subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    } else {
      this._productService.getProducts().subscribe( data => {
        this.loading = false;
        this.productList = data;
      });
    }     
  };
  
  anadirProducto(producto:Product){
    this.productName = producto.nombre;
    
    this._productService.addToCart(producto);

    this.mostrarNotificacion = true;
    setTimeout(function(){

      this.mostrarNotificacion = false;

    }.bind(this),700);


  }

}
