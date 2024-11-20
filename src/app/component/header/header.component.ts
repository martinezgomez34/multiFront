import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DarkmodeButtonComponent } from '../button/darkmode-button/darkmode-button.component';
import { LogoComponent } from "../logo/logo.component";
import { StateService } from '../../service/state.service';

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

  showMenu = false;

  stateService = inject(StateService)
  constructor(){
    console.log(this.stateService, "paso por aqui")
  }

  toggleDarkMode(isDark: boolean): void { 
    this.darkModeToggled.emit(isDark); 
  }
}