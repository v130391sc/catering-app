import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { StorageService } from './storage.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router,
        private _storageService:StorageService) { }

  canActivate() {
    if (this._storageService.isAuthenticated() 
    && this._storageService.isAdmin() ) {
        return true;
    }
    this.router.navigate(["/no-access"]);
    return false;
  }
}