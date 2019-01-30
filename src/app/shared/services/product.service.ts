import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Product } from '../models/product';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL:string = "http://localhost:8080/v1/products";
  productAdminURL:string = "http://localhost:8080/v1/clientsAd";
  navbarCartCount = 0;

  constructor(private http:HttpClient) { }

  getProducts( termino?:string, pMin?:number, pMax?:number ){
    let query:string = "";
    if(termino!==undefined &&  pMin===undefined && pMax===undefined){
        query = `?nombre=${ termino }`;
    } else if(termino!==undefined &&  pMin===undefined && pMax!==undefined){
        query = `?nombre=${ termino }&pMax=${ pMax }`;
    } else if(termino!==undefined && pMin!==undefined && pMax!==undefined){
        query = `?nombre=${ termino }&pMin=${pMin}&pMax=${ pMax }`;
    } else if(termino===undefined && pMin!==undefined && pMax!==undefined){
        query = `?pMin=${pMin}&pMax=${ pMax }`;
    } else if(termino===undefined &&  pMin===undefined && pMax!==undefined){
        query = `?pMax=${ pMax }`;
    } else if(termino===undefined && pMin!==undefined && pMax===undefined){
        query = `?pMin=${pMin}`;
    } else if(termino!==undefined && pMin!==undefined && pMax===undefined){
        query = `?nombre=${ termino }&pMin=${pMin}`;
    } else {
        query = "";
    } 
    let url = this.productURL + query;
    return this.http.get<Product[]>( url );
  }

  getProductsAdmin(nombreUsuario:string, termino?:string){
      let query:string = "";
    if(termino != undefined){
        query = `?nombre=${ termino }`;
    }

    let url = `${ this.productAdminURL }/${ nombreUsuario }/products${query}`;

    return this.http.get<Product[]>( url );
  }

  getProductAdmin(nombreUsuario:string, idProducto:number){
      
      let url = `${ this.productAdminURL }/${ nombreUsuario }/products/${ idProducto }`;

      return this.http.get<Product>( url );
  }

    createProduct(producto:Product, nombreUsuario:string){
        let body = JSON.stringify( producto );
        let headers = new HttpHeaders({
          'Content-Type':'application/json'
        });
    
        let url = `${ this.productAdminURL }/${ nombreUsuario }/products`;

        return this.http.post(  url, body, { headers }  );
    }

    updateProduct(producto:Product, nombreUsuario:string, idProducto:number){
        let body = JSON.stringify( producto );
        let headers = new HttpHeaders({
          'Content-Type':'application/json'
        });
    
        let url = `${ this.productAdminURL }/${ nombreUsuario }/products/${ idProducto }`;

        return this.http.put(  url, body, { headers }  );
    }

    deleteProduct(nombreUsuario:string, idProducto:number){
        let url = `${ this.productAdminURL }/${ nombreUsuario }/products/${ idProducto }`;

        return this.http.delete( url );
    }

    addToCart(producto:Product){
        let prod: Product[];
        
        prod = JSON.parse(localStorage.getItem('avct_item')) || [];
        
        prod.push(producto);
    
        localStorage.setItem('avct_item', JSON.stringify(prod));
        this.calculateLocalCartProdCounts();
    }

    	// Removing cart from local
	removeLocalCartProduct(product: Product) {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item'));

		for (let i = 0; i < products.length; i++) {
			if (products[i].id === product.id) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem('avct_item', JSON.stringify(products));

		this.calculateLocalCartProdCounts();
	}
    // Fetching Locat CartsProducts
	getLocalCartProducts(): Product[] {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];

		return products;
    }
    
    removeCurrentCart(): void {
        localStorage.removeItem('avct_item');
      }

    // returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
		this.navbarCartCount = this.getLocalCartProducts().length;
	}
}
