import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from '../common/base-dialog/base-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  openDialog(data: any): Observable<any> {
    const dialogRef = this.dialog.open(BaseDialogComponent, {
      width: '250px',
      data
    });

    return dialogRef.afterClosed();
  }

  openSnackBar(duration: number, message: string): void {
    this.snackBar.open(message, 'Ok', {duration});
  }
}
