import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {Movie} from '../../../models/movie';

@Component({
  selector: 'app-add-movie-form',
  imports: [
    Dialog,
    InputText,
    FormsModule,
    ButtonDirective,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  movie?: Movie;
  @Input() showAddMovieModal: boolean = false;
  @Output() submit = new EventEmitter<Movie>();
  @Output() close = new EventEmitter<void>();

  addMovieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
  })

  submitMovie() {
    if (this.addMovieForm.valid) {
      this.movie = {
        name: this.addMovieForm.get("name")?.value!,
        genre: this.addMovieForm.get("genre")?.value!,
      }
    }
    this.submit.emit(this.movie);
  }

  closeForm() {
    this.close.emit();
  }
}
