import {Component} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {AddMovieFormComponent} from './add-movie-form/add-movie-form.component';
import {TableModule} from 'primeng/table';
import {Movie} from '../../models/movie';

@Component({
  selector: 'app-movies-page',
  imports: [
    AddMovieFormComponent,
    TableModule
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {

  constructor(private userService: UserService) {
  }

  showAddMovieModal: boolean = false;
  movies: Movie[] = [];

  submitMovie(event: any) {
    this.showAddMovieModal = false;
    console.log(event);
  }

  resetForm() {
    this.showAddMovieModal = false;
  }
}
