import { Component , Input, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() isDarkMode!: boolean;

  constructor() {}
  
  ngOnInit(): void {
    console.log('LogoComponent isDarkMode:', this.isDarkMode);
  }
}
