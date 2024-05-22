import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44313';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(nombre: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/login`, { nombre, password })
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
