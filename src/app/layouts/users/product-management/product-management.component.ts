import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  productList:Product[] = [];
  loading:boolean = false;
  textoNotificacion:string = "";
  hayError: boolean = false;
  mostrarNotificacion:boolean = false;
  nombreUsuario:string;

  constructor(private _productService:ProductService,
    private _storageService:StorageService) {
      this.loading = true;
      this.nombreUsuario = this._storageService.getCurrentUser().usuario;
      this._productService.getProductsAdmin(this._storageService.getCurrentUser().usuario).subscribe(data =>{
          this.loading = false;
          this.productList = data;
      })
   }

  ngOnInit() {
  }

  borrarProducto(idProducto:number, index:number){
    this._productService.deleteProduct(this.nombreUsuario, idProducto).subscribe(data =>{
      if(data){
        this.hayError = true;
        this.textoNotificacion = "Se ha producido un error"
      } else {
        this.productList.splice(index,1);
        this.hayError = false;
        this.textoNotificacion = `Producto eliminado con éxito`
      }
      this.mostrarNotificacion = true;
      setTimeout(function(){

        this.mostrarNotificacion = false;
  
      }.bind(this),1500);
  });
}

  public buscarProducto( termino:string ){
    this.loading = true;
    this._productService.getProductsAdmin(this.nombreUsuario,termino).subscribe(data=>{
      this.loading = false;
      this.productList = data;
    })
  }
  
}
