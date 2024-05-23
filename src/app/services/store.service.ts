import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'https://localhost:44313';

  constructor(private http: HttpClient) { }

  getStore(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/Tienda`);
  }

  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/Tienda/${id}`);
  }

  addStore(tienda: Store): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Tienda`, tienda);
  }

  updateStore(id: number, tienda: Store): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/Tienda/${id}`, tienda);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Tienda/${id}`);
  }
}
