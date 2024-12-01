import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../../service/local-storage.service';

@Component({
  selector: 'app-darkmode-button',
  standalone: true,
  imports: [],
  templateUrl: './darkmode-button.component.html',
  styleUrls: ['./darkmode-button.component.scss']
})
export class DarkmodeButtonComponent {
  @Input() isDarkMode!: boolean; 

  @Output() darkModeToggled = new EventEmitter<boolean>();

  constructor(private localdark: LocalStorageService){}

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeToggled.emit(this.isDarkMode);
    this.localdark.setDarkMode(this.isDarkMode); 
    
    // Recarga la página para aplicar el modo oscuro inmediatamente
    window.location.reload();
  }
}
