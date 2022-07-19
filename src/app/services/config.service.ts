import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
  hidden?: boolean;
  editable?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  itemColumns: ITableColumn[] = [
    { key: "name", title: "Név", editable:true },
    { key: "length", title: "Hossz", editable:true },
    { key: "width", title: "Szélesség", editable:true },
    { key: "actions", title: "" },
  ];

  warehouseColumns: ITableColumn[] = [
    { key: "id", title: "Azonosító" },
    { key: "address", title: "Cím", editable:true },
    { key: "length", title: "Hossz", editable:true },
    { key: "width", title: "Szélesség", editable:true },
    { key: "actions", title: "" },
  ];

  constructor() { }
}
