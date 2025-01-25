import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {AddMovieFormComponent} from './add-movie-form/add-movie-form.component';
import {TableModule} from 'primeng/table';
import {Movie} from '../../models/movie';
import {Card} from 'primeng/card';
import {MovieService} from '../../services/movie.service';
import {NgForOf, NgIf} from '@angular/common';
import {Chip} from 'primeng/chip';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-movies-page',
  imports: [
    ConfirmDialogModule,
    AddMovieFormComponent,
    TableModule,
    Card,
    NgForOf,
    Chip,
    Ripple,
    Button,
    NgIf
  ],
  providers: [ConfirmationService],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private movieService: MovieService) {
  }

  showAddMovieModal: boolean = false;
  movies: Movie[] = [];
  expandedRows = {};

  ngOnInit(): void {
    this.updateData();
  }

  private updateData() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  submitMovie(event: any) {
    this.showAddMovieModal = false;
    this.movieService.save(event).subscribe(() => {
      this.updateData();
    });
  }

  resetForm() {
    this.showAddMovieModal = false;
  }

  deleteMovie(event: MouseEvent, movie: Movie) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this movie?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (movie.id != null) {
          this.movieService.deleteMovie(movie.id).subscribe(() => {
            this.updateData();
          });
        }
      }
    });
  }
}
