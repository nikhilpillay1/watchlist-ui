import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {AddMovieFormComponent} from './add-movie-form/add-movie-form.component';
import {TableModule} from 'primeng/table';
import {Movie} from '../../models/movie';
import {Card} from 'primeng/card';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-movies-page',
  imports: [
    AddMovieFormComponent,
    TableModule,
    Card
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent implements OnInit {

  constructor(private userService: UserService, private movieService: MovieService) {
  }

  showAddMovieModal: boolean = false;
  movies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    })
  }

  submitMovie(event: any) {
    this.showAddMovieModal = false;
    console.log(event);
    this.movieService.save(event).subscribe();
  }

  resetForm() {
    this.showAddMovieModal = false;
  }
}
