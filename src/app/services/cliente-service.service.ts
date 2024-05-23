import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'https://localhost:44313';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente`);
  }

  obtenerClientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cliente/${id}`);
  }

  agregarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cliente`, cliente);
  }

  updateClient(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cliente/${id}`, cliente);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cliente/${id}`);
  }
}
