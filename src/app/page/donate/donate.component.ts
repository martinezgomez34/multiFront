import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {
  @Input() isDarkMode!: boolean;
}
