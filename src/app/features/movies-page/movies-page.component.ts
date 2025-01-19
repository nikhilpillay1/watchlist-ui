import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../models/user';
import {Button} from 'primeng/button';
import {AddMovieFormComponent} from './add-movie-form/add-movie-form.component';

@Component({
  selector: 'app-movies-page',
  imports: [
    Button,
    AddMovieFormComponent
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  selectedUser!: User;
  showAddMovieModal: boolean = false;

  ngOnInit(): void {
    this.selectedUser = this.userService.getUser();
  }

  submitMovie(event: any) {
    this.showAddMovieModal = false;
    console.log(event);
  }

  resetForm() {
    this.showAddMovieModal = false;
  }
}
