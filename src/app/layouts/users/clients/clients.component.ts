import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  userList:User[] = [];
  nombreUsuario:string;
  textoNotificacion:string = "";
  hayError: boolean = false;
  mostrarNotificacion:boolean = false;
  loading = false;

  constructor(private _userService:UserService) {
    this.loading = true;
    this._userService.getUsers().subscribe(data=>{
      this.loading = false;
      this.userList = data;
    });
   }

  ngOnInit() {
  }

  borrarUsuario(usuario:User, index:number){
    this._userService.deleteUser(usuario.usuario).subscribe(data =>{
      if(data){
        this.hayError = true;
        this.textoNotificacion = "Se ha producido un error"
      } else {
        this.userList.splice(index,1);
        this.hayError = false;
        this.textoNotificacion = `Usuario ${ usuario.usuario} eliminado con éxito`
      }
      this.mostrarNotificacion = true;
      setTimeout(function(){

        this.mostrarNotificacion = false;
  
      }.bind(this),1500);
    })
  }

}
