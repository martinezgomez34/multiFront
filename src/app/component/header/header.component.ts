import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../../page/login/login.component';
import { DarkmodeButtonComponent } from '../button/darkmode-button/darkmode-button.component';
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    DarkmodeButtonComponent,
    LogoComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isDarkMode!: boolean;
  @Output() darkModeToggled = new EventEmitter<boolean>();
    toggleDarkMode(isDark: boolean): void { 
    this.darkModeToggled.emit(isDark); 
  }
}