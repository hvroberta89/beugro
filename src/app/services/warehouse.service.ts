import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { Warehouse } from './../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends BaseService<Warehouse> {

  constructor(
    public override http:HttpClient
  ) {
    super(http);
    this.entityName = 'warehouses';
  }
}
