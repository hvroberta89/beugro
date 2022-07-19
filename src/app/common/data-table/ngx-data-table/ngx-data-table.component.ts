import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService, ITableColumn } from 'src/app/services/config.service';


@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T extends {[x: string]: any}> implements OnInit {

  dataSource = new MatTableDataSource<T>;
  displayedColumns: any[] = [];

  @Input() tableTitle: string = '';
  @Input() tableColumn: ITableColumn[] = [];
  @Input() currentFilterKey: string = '';
  @Input() list: T[] = [];
  @Input() editable: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() createOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() selectOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() openEditDialog: EventEmitter<T> = new EventEmitter<T>();
  @Output() deleteOne: EventEmitter<T> = new EventEmitter<T>();

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.list;

    this.displayedColumns = this.tableColumn.map( col => col.key );

    this.dataSource.filterPredicate = ( data: { [key: string]: any }, filter: string ) => {
      const key = this.currentFilterKey || '';
      const source = key ? String( data[key] ) : JSON.stringify( data );
      return source.toLowerCase().includes(filter.toLowerCase());
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter( event: Event ) {
    const filterValue = ( event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(): void {
    this.createOne.emit();
  }

  onEdit( entity: T ): void {
    this.openEditDialog.emit( entity );
  }

  onDelete( entity: T ): void {
    this.deleteOne.emit( entity );
  }

}
