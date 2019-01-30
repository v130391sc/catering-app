import { Injectable } from '@angular/core';
import { LoginObject } from '../models/loginObject';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { UserService } from './user.service';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  sessionObj:Session;

  constructor(private http:HttpClient,
    private _userService:UserService,
    private _storageService:StorageService
    ) {
      this.user = new User();
      this.sessionObj = new Session();
     }

  login(userAuth:LoginObject){

    let body = JSON.stringify( userAuth );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    let url = "http://localhost:8080/login";

    return this.http.post(url, body)
              .map(res => {
              
                return this.extractData(res, userAuth.usuario);
              });

  }

  private extractData(res, username:string) {
    this._userService.getUser(username, res.token)
          .subscribe( data => {
            data.fechaNacimiento = data.fechaNacimiento.substring(0,10);
            this.sessionObj.user = data;
            this.sessionObj.token = res.token;
            this._storageService.setCurrentSession(this.sessionObj);
          });

    return this.sessionObj;
  }

      
}
