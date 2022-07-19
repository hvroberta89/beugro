import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ITableColumn, ConfigService } from './../../services/config.service';
import { MessageService } from './../../services/message.service';
import { WarehouseService } from './../../services/warehouse.service';
import { Warehouse } from './../../models/warehouse';
import { WarehouseEditDialogComponent } from '../warehouse-edit-dialog/warehouse-edit-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  tableTitle: string = "Raktárak";
  tableColumn : ITableColumn[] = this.config.warehouseColumns;
  currentFilterKey: string = "address";
  list$: Observable<Warehouse[]> = this.warehouseService.getAll();
  warehouse: Warehouse = new Warehouse();
  user$: Observable<User | null> = this.auth.user$;
  editable: boolean = false;

  fits: boolean = false;
  warehousesArea: number = 0;
  itemsArea: number = 0;

  constructor(
    private config: ConfigService,
    private warehouseService: WarehouseService,
    private itemService: ItemService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (user => {
        if(user){
          this.editable = (user.role==1 ? true : false);
        }
      })
    })
    this.fits = this.warehousesArea > this.itemsArea ? true : false;
  }

  getWarehousesArea(): void {
    this.warehouseService.getAll().subscribe({
      next: (warehouses) => {
        this.warehousesArea = Object.values(warehouses)
          .reduce((total, {width, length}) => total + (width*length), 0)
      }
    })
  }
  getItemsArea(): void {
    this.itemService.getAll().subscribe({
      next: (items) => {
        this.itemsArea = Object.values(items)
          .reduce((total, {width, length}) => total + (width*length), 0)
      }
    })
  }

  onCreateOne(): void {
    this.warehouse = new Warehouse();
    this.openEditDialog(this.warehouse);
  }

  openEditDialog(warehouse: Warehouse): void {
    console.log(warehouse)
    const dialogRef = this.dialog.open(
      WarehouseEditDialogComponent,
      { width: '350px', data: warehouse}
      );
    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) {
          return
        }
        this.messageService.openSnackBar( 3000, "Sikeres mentés" );
        this.list$ = this.warehouseService.getAll();
      })
  }

  onDeleteOne(warehouse: Warehouse): void {
    const dialogData = {
      title: 'Törlés',
      content: 'Biztosan törölni akarja a "'+ warehouse.id + '" azonosítójú elemet?'
    };
    this.messageService.openDialog(dialogData).pipe(
      take(1)
    ).subscribe(
      result => {
        if (!result) {
          return;
        }
        this.warehouseService.delete(warehouse.id).subscribe({
          next: () => {
            this.messageService.openSnackBar( 3000, "Törölve" );
            this.list$ = this.warehouseService.getAll();
          },
          error: (err) => console.error(err),
        });
      }
    )
  }
}
