import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-centro',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.scss'
})
export class CenterComponent {
  @Input() isDarkMode!: boolean;
}
