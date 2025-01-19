import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Movie} from '../../../models/movie';
import {MultiSelect} from 'primeng/multiselect';
import {Panel} from 'primeng/panel';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../models/user';
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-movie-form',
  imports: [
    InputText,
    FormsModule,
    ReactiveFormsModule,
    Button,
    MultiSelect,
    Panel,
    NgClass
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  movie?: Movie;
  genres: string[] = [];
  isCollapsed =  false;
  selectedUser!: User;
  @Output() submit = new EventEmitter<Movie>();
  private userSubscription!: Subscription

  addMovieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    genres: new FormControl<string[] | null>([], [Validators.required]),
  })

  ngOnInit(): void {
    this.genres = [
      "Action", "Adventure", "Horror", "Drama",
      "Sci-fi", "Romance", "Thriller", "Comedy"
    ]
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.selectedUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  submitMovie() {
    if (this.addMovieForm.valid) {
      this.movie = {
        name: this.addMovieForm.get("name")?.value!,
        genres: this.addMovieForm.get("genres")?.value!,
        submittedBy: this.selectedUser,
      }
    }
    this.submit.emit(this.movie);
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }
}
