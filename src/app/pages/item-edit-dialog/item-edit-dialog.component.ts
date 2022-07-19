import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import cryptoRandomString from 'crypto-random-string';

import { ConfigService } from './../../services/config.service';
import { ItemService } from './../../services/item.service';
import { Item } from './../../models/item';


@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.scss']
})
export class ItemEditDialogComponent implements OnInit {
  dataForm !: FormGroup;
  tableTitle: string = "Tárgy szerkesztő";
  idHide: boolean = true

  constructor(
    public config: ConfigService,
    public itemService: ItemService,
    public dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ) { }

  ngOnInit(): void {
    this.idHide = this.data.id=='';
    this.dataForm = new FormGroup({
      name: new FormControl( this.data.name, [Validators.required] ),
      length: new FormControl( this.data.length, [Validators.required] ),
      width: new FormControl( this.data.width, [Validators.required] )
    })
  }

  get name() { return this.dataForm.get('name')!; }
  get length() { return this.dataForm.get('length')!; }
  get width() { return this.dataForm.get('width')!; }

  submitForm(): void {
    this.data.name = this.dataForm.value.name;
    this.data.length = this.dataForm.value.length;
    this.data.width = this.dataForm.value.width;
    if (this.data.id == "") {
      this.data.id = cryptoRandomString({ length: 10 });
      this.itemService.create(this.data as Item).subscribe({
        next: () => this.dialogRef.close(this.data),
        error: err => console.error(err)
      })
    } else {
      this.itemService.update(this.data as Item).subscribe({
        next: () => this.dialogRef.close(this.data),
        error: err => console.error(err)
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
