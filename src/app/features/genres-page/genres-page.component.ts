import {Component, OnInit} from '@angular/core';
import {Card} from "primeng/card";
import {TableModule} from "primeng/table";
import {Genre} from '../../models/genre';
import {GenreService} from '../../services/genre.service';
import {Button} from 'primeng/button';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-genres-page',
  imports: [
    Card,
    TableModule,
    Button,
    ConfirmDialog
  ],
  providers: [ConfirmationService],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.css'
})
export class GenresPageComponent implements OnInit {

  constructor(private genreService: GenreService, private confirmationService: ConfirmationService) {
  }

  genres: Genre[] = [];

  ngOnInit(): void {
    this.getGenres();
  }

  private getGenres() {
    this.genreService.getAllGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  deleteGenre($event: MouseEvent, genre: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this genre?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (genre.id != null) {
          this.genreService.deleteGenre(genre.id).subscribe({
            next: () => {
              this.getGenres();
            }
          });
        }
      }
    });
  }
}
