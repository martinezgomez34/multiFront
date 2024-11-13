import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-darkmode-button',
  standalone: true,
  imports: [],
  templateUrl: './darkmode-button.component.html',
  styleUrl: './darkmode-button.component.scss'
})
export class DarkmodeButtonComponent {
  @Input() isDarkMode!: boolean; 

  @Output() darkModeToggled = new EventEmitter<boolean>();

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeToggled.emit(this.isDarkMode); 
  }
}
