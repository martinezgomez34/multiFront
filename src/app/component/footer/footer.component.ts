import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() isDarkMode!: boolean;
  @Output() darkModeToggled = new EventEmitter<boolean>();

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // Recupera la preferencia de modo oscuro desde localStorage
    this.isDarkMode = this.localStorageService.getDarkMode();
  }

  toggleDarkMode(): void {
    // Cambia el estado de modo oscuro
    this.isDarkMode = !this.isDarkMode;
    this.localStorageService.setDarkMode(this.isDarkMode);  // Guarda el estado
    this.darkModeToggled.emit(this.isDarkMode);  // Emite el evento
  }
}
