import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
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

  public deleteGenre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
