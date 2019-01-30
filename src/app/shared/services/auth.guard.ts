import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
     private _storageService:StorageService) { }

  canActivate() {
    if (this._storageService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}