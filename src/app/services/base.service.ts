import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id?: string, [key: string]: any }> {

  apiUrl: string = environment.apiUrl;

  entityName: string = '';

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

  getOne(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${this.entityName}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${this.entityName}/${entity.id}`, entity);
  }

  delete(id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }
}
