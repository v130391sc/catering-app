import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _storageService:StorageService) { }

  ngOnInit() {
  }

  esAdmin(): boolean {
    return this._storageService.isAdmin();
  }
}
