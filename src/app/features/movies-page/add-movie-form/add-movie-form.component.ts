import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Movie} from '../../../models/movie';
import {MultiSelect} from 'primeng/multiselect';
import {Panel} from 'primeng/panel';
import {UserService} from '../../../shared/services/user.service';
import {NgClass, NgIf, TitleCasePipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {Checkbox} from 'primeng/checkbox';
import {AutoComplete} from 'primeng/autocomplete';
import {PrimeTemplate} from 'primeng/api';
import {Genre} from '../../../models/genre';
import {GenreService} from '../../../services/genre.service';

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
    AutoComplete,
    PrimeTemplate,
    NgIf,
    TitleCasePipe
  ],
  providers: [TitleCasePipe],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private genreService: GenreService, private titleCasePipe: TitleCasePipe) {
  }

  movie?: Movie;
  genres: Genre[] = [];
  isCollapsed =  true;
  selectedUser!: string;
  @Output() submit = new EventEmitter<Movie>();
  private userSubscription!: Subscription
  private seriesSubscription!: Subscription
  isSeries: boolean = false;
  searchText: string = '';
  showAddButton = false;
  genreText = '';

  addMovieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isSeries: new FormControl(false),
    genres: new FormControl<Genre[] | null>([], [Validators.required]),
    subtitles: new FormControl<string[]>([]),
  })

  ngOnInit(): void {
    this.getGenres();

    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.selectedUser = user;
    });

    this.seriesSubscription = this.addMovieForm.get('isSeries')!.valueChanges.subscribe((checked) => {
      this.isSeries = !!checked;
    });

  }

  private getGenres() {
    this.genreService.getAllGenres().subscribe(genres => {
      this.genres = genres.map(genre => ({
        ...genre,
        name: this.titleCasePipe.transform(genre.name),
      }));
    });
    console.log(this.genres);
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
            return {
              id: genre.id,
              name: genre.name.toLowerCase(),
            }
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
            return {
              id: genre.id,
              name: genre.name.toLowerCase(),
            }
          }),
          isSeries: this.addMovieForm.get("isSeries")?.value!,
          submitter: this.selectedUser,
        }
      }
      console.log(this.movie);
      this.submit.emit(this.movie);
      this.addMovieForm.reset();

    } else {
      console.log("invalid");
    }

  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  checkFilter(event: any) {
    let matchFound = false;
    this.searchText = event.filter.trim();
    this.genres.map(genre => {
      if (genre.name.toLowerCase().includes(this.searchText.toLowerCase())) {
        matchFound = true;
      }
    });
    this.showAddButton = !matchFound;
  }

  saveGenre() {
    this.genreService.save({
      name: this.searchText.toLowerCase(),
    }).subscribe({
      next: () => {
        this.getGenres();
      },
      error: (err) => {
        console.error('Error submitting genre: ', err)
      }
    });
  }
}
