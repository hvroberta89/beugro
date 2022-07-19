import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ITableColumn, ConfigService } from './../../services/config.service';
import { MessageService } from './../../services/message.service';
import { ItemService } from './../../services/item.service';

import { Item } from './../../models/item';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  tableTitle: string = "Tárgyak";
  tableColumn : ITableColumn[] = this.config.itemColumns;
  currentFilterKey: string = "name";
  list$: Observable<Item[]> = this.itemService.getAll();
  item: Item = new Item();
  user$: Observable<User | null> = this.auth.user$;
  editable: boolean = false;

  constructor(
    private config: ConfigService,
    private itemService: ItemService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {  }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (user => {
        if(user){
          this.editable = (user.role==1 ? true : false);
        }
      })
    })
  }

  onCreateOne(): void {
    this.item = new Item();
    this.openEditDialog(this.item);
  }

  openEditDialog(item: Item): void {
    console.log(item)
    const dialogRef = this.dialog.open(
      ItemEditDialogComponent,
      { width: '350px', data: item}
      );
    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) {
          return
        }
        this.messageService.openSnackBar( 3000, "Sikeres mentés" );
        this.list$ = this.itemService.getAll();
      })
  }

  onDeleteOne(item: Item): void {
    const dialogData = {
      title: 'Törlés',
      content: 'Biztosan törölni akarja a "'+ item.name + '" nevű elemet?'
    };
    this.messageService.openDialog(dialogData).pipe(
      take(1)
    ).subscribe(
      result => {
        if (!result) {
          return;
        }
        this.itemService.delete(item.id).subscribe({
          next: () => {
            this.messageService.openSnackBar( 3000, "Törölve" );
            this.list$ = this.itemService.getAll();
          },
          error: (err) => console.error(err),
        });
      }
    )
  }
}
