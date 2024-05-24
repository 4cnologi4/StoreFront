import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://localhost:44313';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/Articulo`);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/Articulo/${id}`);
  }

  addArticle(article: Article): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Articulo`, article);
  }

  updateArticle(id: number, article: Article): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/Articulo/${id}`, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Articulo/${id}`);
  }
}
