import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = "http://localhost:8080/api/genre";

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseUrl}/all`);
  }

  public save(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.baseUrl}/save`, genre);
  }


}
