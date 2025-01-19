import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-subtitle-input',
  imports: [
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './subtitle-input.component.html',
  styleUrl: './subtitle-input.component.css'
})
export class SubtitleInputComponent {

  subtitles: string[] = [
    '',
  ];

  addSubtitle() {
    this.subtitles.push('');
  }
}
