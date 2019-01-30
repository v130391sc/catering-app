import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orderList:Order[] = [];
  nombreUsuario:string;
  textoNotificacion:string = "";
  hayError: boolean = false;
  mostrarNotificacion:boolean = false;
  loading = false;

  constructor(private _userService:UserService,
    private _storageService:StorageService) {
    this.nombreUsuario = this._storageService.getCurrentUser().usuario;
    this.loading = true;
    this._userService.getAllOrdersAdmin(this.nombreUsuario).subscribe(data=>{
      this.loading = false;
      this.orderList = data;
    });
   }

  ngOnInit() {
  }

  borrarPedido(pedido:Order, index:number){
    this._userService.deleteOrderFromClient(this.nombreUsuario, pedido.id).subscribe(data =>{
      if(data){
        this.hayError = true;
        this.textoNotificacion = "Se ha producido un error"
      } else {
        this.orderList.splice(index,1);
        this.hayError = false;
        this.textoNotificacion = `Pedido eliminado con éxito`
      }
      this.mostrarNotificacion = true;
      setTimeout(function(){

        this.mostrarNotificacion = false;
  
      }.bind(this),1500);
    })
  }

  entregarPedido(pedido:Order){
    let tipoImp = "21";
    let precio = pedido.precio;
    this._userService.updatePedidoClienteAdmin(this.nombreUsuario,pedido, tipoImp, precio)
            .subscribe(data => {
              this.hayError = false;
              this.textoNotificacion = `Pedido entregado con éxito`
            }, error => {
              this.hayError = true;
              this.textoNotificacion = "Se ha producido un error"
            })
    this.mostrarNotificacion = true;
    setTimeout(function(){
          
      this.mostrarNotificacion = false;
          
    }.bind(this),1500);
  }


}
