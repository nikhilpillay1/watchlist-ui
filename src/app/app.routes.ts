import { Routes } from '@angular/router';
import {LoginPageComponent} from './features/login-page/login-page.component';
import {MoviesPageComponent} from './features/movies-page/movies-page.component';
import {GenresPageComponent} from './features/genres-page/genres-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'movies', component: MoviesPageComponent},
  {path: 'genres', component: GenresPageComponent},
];
