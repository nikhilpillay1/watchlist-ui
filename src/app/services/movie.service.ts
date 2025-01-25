import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = "http://localhost:8080/api/movie";

  public save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/save`, movie);
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/all`);
  }

  public deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
