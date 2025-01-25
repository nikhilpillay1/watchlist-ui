import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Movie} from '../../../models/movie';
import {MultiSelect} from 'primeng/multiselect';
import {Panel} from 'primeng/panel';
import {UserService} from '../../../shared/services/user.service';
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';
import {Checkbox} from 'primeng/checkbox';
import {AutoComplete} from 'primeng/autocomplete';

@Component({
  selector: 'app-add-movie-form',
  imports: [
    InputText,
    FormsModule,
    ReactiveFormsModule,
    Button,
    MultiSelect,
    Panel,
    NgClass,
    Checkbox,
    AutoComplete
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) {
  }

  movie?: Movie;
  genres: string[] = [];
  isCollapsed =  true;
  selectedUser!: string;
  @Output() submit = new EventEmitter<Movie>();
  private userSubscription!: Subscription
  private seriesSubscription!: Subscription
  isSeries: boolean = false;

  addMovieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isSeries: new FormControl(false),
    genres: new FormControl<string[] | null>([], [Validators.required]),
    subtitles: new FormControl<string[]>([]),
  })

  ngOnInit(): void {
    this.genres = [
      "Action", "Adventure", "Horror", "Drama",
      "Sci-fi", "Romance", "Thriller", "Comedy"
    ]
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.selectedUser = user;
    });

    this.seriesSubscription = this.addMovieForm.get('isSeries')!.valueChanges.subscribe((checked) => {
      this.isSeries = !!checked;
    });

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.seriesSubscription) {
      this.seriesSubscription.unsubscribe();
    }
  }

  submitMovie() {
    if (this.addMovieForm.valid) {

      if (this.addMovieForm.get("isSeries")?.value === true) {
        this.movie = {
          name: this.addMovieForm.get("name")?.value!,
          genres: this.addMovieForm.get("genres")!.value!.map(genre => {
            return { name: genre };
          }),
          isSeries: this.addMovieForm.get("isSeries")?.value!,
          submitter: this.selectedUser,
          subtitles: this.addMovieForm.get("subtitles")!.value!.map(subtitle => {
            return { subtitle : subtitle};
          }),
        }
      } else {
        this.movie = {
          name: this.addMovieForm.get("name")?.value!,
          genres: this.addMovieForm.get("genres")!.value!.map(genre => {
            return { name: genre };
          }),
          isSeries: this.addMovieForm.get("isSeries")?.value!,
          submitter: this.selectedUser,
        }
      }
    }
    console.log(this.movie);
    this.submit.emit(this.movie);
    this.addMovieForm.reset();
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }
}
