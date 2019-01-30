import { Injectable } from '@angular/core';
import { 
  HttpRequest, 
  HttpHandler, 
  HttpInterceptor, 
  HttpEvent, 
  HttpErrorResponse, 
  HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router:Router,
      private _storageService:StorageService
      ) { }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this._storageService.getCurrentToken();

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  // do stuff with response if you want
                }
              }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.router.navigate["/no-access"];
                  }
                }
              });
        }
        else {
            return next.handle(req).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  // do stuff with response if you want
                }
              }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.router.navigate["/no-access"];
                  }
                }
              });
        }
    }

}