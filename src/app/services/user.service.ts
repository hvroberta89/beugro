import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    public override http:HttpClient
  ) {
    super(http);
    this.entityName = 'users';
  }
}
