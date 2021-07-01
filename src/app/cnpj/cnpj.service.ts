import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class GenericService<T> {

  path: string;

  private readonly urlApi: string = environment.api;

  constructor(private http: HttpClient) { }

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.urlApi}/${this.path}/${id}`).pipe(map(() => (id), (error: any) => (error)));
  }

 
 
  

  postPath(): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}`, ``);
  }

  put(entity: any): Observable<T> {
    return this.http.put<T>(`${this.urlApi}/${this.path}/${entity.id}`, entity);
  }
}
