import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { createOrder } from '../models/createOrder';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = new User();
  constructor(private http:HttpClient) { }

  userURL:string = "http://localhost:8080/v1/clients";
  adminURL:string = "http://localhost:8080/v1/clientsAd"

  getUsers() {

    return this.http.get<User[]>( this.userURL );
  }

  getUser(usuario:string, token:string){
    let url = `${ this.userURL }/${usuario}`; 
        let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this.http.get<User>( url, {headers} );
  }

  getUserAfterLogin(usuario:string){
    let url = `${ this.userURL }/${usuario}`; 
        let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<User>( url, {headers} );
  }

  createUser(usuario:User){
    usuario.tipoCliente = "USER";
    let body = JSON.stringify( usuario );
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    });

    let url = `${ this.userURL }/signUp`;

    return this.http.post(  url, body, { headers }  );
  }

  updateUser(usuario:User, nombreUsuario:string){
    usuario.tipoCliente = "USER";
    let body = JSON.stringify( usuario );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    let url = `${ this.userURL }/${nombreUsuario}`;

    return this.http.put(  url , body, { headers }  );
  }

  deleteUser(nombreUsuario:string){
    let url = `${ this.userURL }/${ nombreUsuario }`;

    return this.http.delete( url );
  }

  getAllOrdersFromUser(nombreUsuario:string){
    let url = `${ this.userURL }/${nombreUsuario}/orders`; 
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Order[]>( url, {headers} );
  }

  getOrderFromUser(nombreUsuario:string, idPedido:number){
    let url = `${ this.userURL }/${nombreUsuario}/orders/${ idPedido }`; 
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Order>( url, {headers} );
  }
  
  getAllOrdersAdmin(admin:string){
    let url = `${ this.adminURL }/${admin}/orders`; 
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get<Order[]>( url, {headers} );
  }

  createOrderFromClient(nombreUsuario:string, order:createOrder){

    let body = JSON.stringify( order );
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    });

    let url = `${ this.userURL }/${ nombreUsuario }/orders`;

    return this.http.post(  url, body, { headers }  );
  }

  deleteOrderFromClient(admin:string, idPedido:number){
    let url = `${ this.adminURL }/${admin}/orders/${ idPedido }`; 

    return this.http.delete( url );
  }

  updatePedidoClienteAdmin(admin:string, pedido:Order, tipoImpuesto:string, precio:number){
    let url = `${ this.adminURL }/${admin}/orders/${ pedido.id }?tipoImp=${ tipoImpuesto }&coste=${precio}`; 
   
    let body = JSON.stringify( pedido );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.put(  url , body, { headers }  );
  }

  enviarCorreo(email:Email){

    let body = JSON.stringify( email );
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    });

    let url = `http://localhost:8080/v1/contact`;

    return this.http.post(  url, body, { headers }  );
  }
}
