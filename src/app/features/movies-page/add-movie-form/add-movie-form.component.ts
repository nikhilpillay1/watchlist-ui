import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Movie} from '../../../models/movie';
import {MultiSelect} from 'primeng/multiselect';
import {Panel} from 'primeng/panel';

@Component({
  selector: 'app-add-movie-form',
  imports: [
    InputText,
    FormsModule,
    ReactiveFormsModule,
    Button,
    MultiSelect,
    Panel
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  movie?: Movie;
  genres: string[] = [];
  @Output() submit = new EventEmitter<Movie>();

  addMovieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.genres = [
      "Action", "Adventure", "Horror", "Drama",
      "Sci-fi", "Romance", "Thriller", "Comedy"
    ]
  }

  submitMovie() {
    if (this.addMovieForm.valid) {
      this.movie = {
        name: this.addMovieForm.get("name")?.value!,
        genres: this.addMovieForm.get("genres")?.value!,
      }
    }
    this.submit.emit(this.movie);
  }
}
