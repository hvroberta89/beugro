import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { Item } from './../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item>  {

  constructor(
    public override http:HttpClient
  ) {
    super(http);
    this.entityName = 'items';
  }
}
