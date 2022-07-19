import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import cryptoRandomString from 'crypto-random-string';

import { ITableColumn, ConfigService } from './../../services/config.service';
import { WarehouseService } from './../../services/warehouse.service';
import { Warehouse } from './../../models/warehouse';

@Component({
  selector: 'app-warehouse-edit-dialog',
  templateUrl: './warehouse-edit-dialog.component.html',
  styleUrls: ['./warehouse-edit-dialog.component.scss']
})
export class WarehouseEditDialogComponent implements OnInit {
  dataForm !: FormGroup;
  tableTitle: string = "Raktár szerkesztő";
  idHide: boolean = true

  constructor(
    public config: ConfigService,
    public warehouseService: WarehouseService,
    public dialogRef: MatDialogRef<WarehouseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse,
  ) { }

  ngOnInit(): void {
    this.idHide = this.data.id=='';
    this.dataForm = new FormGroup({
      id: new FormControl( {value: this.data.id, disabled: true}, [Validators.required] ),
      address: new FormControl( this.data.address, [Validators.required, Validators.maxLength(50)] ),
      width: new FormControl( this.data.width, [Validators.required, Validators.min(1), Validators.max(5)] ),
      length: new FormControl( this.data.length, [Validators.required, Validators.min(1), Validators.max(5)] ),
    })
  }

  get address() { return this.dataForm.get('address')!; }
  get width() { return this.dataForm.get('width')!; }
  get length() { return this.dataForm.get('length')!; }


  submitForm(): void {
    this.data.address = this.dataForm.value.address;
    this.data.width = this.dataForm.value.width;
    this.data.length = this.dataForm.value.length;
    if (this.data.id == "") {
      this.data.id = cryptoRandomString({length: 10});
      this.warehouseService.create(this.data as Warehouse).subscribe({
        next: () => this.dialogRef.close(this.data),
        error: err => console.error(err)
      })
    } else {
      this.warehouseService.update(this.data as Warehouse).subscribe({
        next: () => this.dialogRef.close(this.data),
        error: err => console.error(err)
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
