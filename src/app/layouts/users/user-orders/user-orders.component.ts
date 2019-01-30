import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Order } from '../../../shared/models/order';
import { StorageService } from '../../../shared/services/storage.service';
import * as jspdf from 'jspdf';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  name = 'Angular 5';
  images = [{
   name: "Image 1", url:"https://4.bp.blogspot.com/-OuIrYzKE1lM/WJ1nqskJ5pI/AAAAAAAAOww/v9JfD7Hb_Fwe_K1svBN7gz2A_BUKxbqGwCLcB/s400/mindblowing-awasome-wallpapers-imgs.jpg"
 },
 {
   name:"Image 2",
   url:"https://akm-img-a-in.tosshub.com/indiatoday/559_102017023826.jpg?TZlWXro5W8Rj4VbO.MpENgo1F2MX93j"
 }]

  orderList:Order[] = [];
  usuario: User;
  loading = false;

  constructor(private _userService:UserService,
    private _storageService:StorageService) {
    this.usuario = this._storageService.getCurrentUser();
    this.loading = true;
    this._userService.getAllOrdersFromUser(this.usuario.usuario).subscribe(data=>{
      this.loading = false;
      this.orderList = data;
      console.log(this.orderList)
    });
   }

  ngOnInit() {
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    console.log("image");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }
  
  //var base64 = (document.getElementById("imageid"));
  descargarFactura(order:Order){
    console.log(order.precio)
    let doc = new jspdf();
    var img = new Image();
    img.src = 'assets/img/logo.png';
    doc.addImage(img, 'png', 20, 7, 50, 50);

    doc.setFont("times", "bold");
    doc.setFontSize(35);
    doc.text(85, 45, 'Cosas de Katy');
    doc.setLineWidth(0.2);
    doc.line(20, 55, 190, 55);
    doc.setFontType("normal");
    doc.setFontSize(15);
    doc.text(20, 70, `Cliente: ${this.usuario.nombre}`);
    doc.setFontSize(13);
    if(order.direccion != null){
      doc.text(20, 80, `Dirección entrega: ${order.direccion}, ${order.ciudad}, ${order.provincia}, ${order.codigoPostal}`);
    }
    doc.text(20, 90, `Fecha pedido: ${order.fechaPedido.substring(0,10)}`);
    doc.text(120, 90, `Fecha entrega: ${order.fechaEntrega.substring(0,10)}`);
    let tablaProd = '<table><tr><th>Producto</th><th>Cantidad</th> <th>Precio(u)</th></tr>';
    for(let listaProd of order.listaProductosPedido){
      tablaProd = tablaProd.concat(`<tr><td>${listaProd.producto.nombre}</td><td>${listaProd.cantidad}</td> <td>${listaProd.producto.costeUnidad}</td></tr>`);
    }
    tablaProd = tablaProd.concat(`</table><span style="font-size:30px">Total: <strong style="color:#dc3545;">${order.precio}</strong><span style="font-size: 20px;"> EURO</span></span>`)
    doc.fromHTML(tablaProd, 20, 87)
    doc.save(`factura-${order.id}.pdf`);
  }
}
