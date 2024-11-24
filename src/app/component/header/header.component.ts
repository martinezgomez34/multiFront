import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DarkmodeButtonComponent } from '../button/darkmode-button/darkmode-button.component';
import { LogoComponent } from "../logo/logo.component";
import { StateService } from '../../service/state.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    DarkmodeButtonComponent,
    LogoComponent,
    MenuComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isDarkMode!: boolean;
  @Output() darkModeToggled = new EventEmitter<boolean>();

  showMenu = false;

  stateService = inject(StateService)
  
  constructor(private router: Router){
    console.log(this.stateService, "paso por aqui")
  }

  logout(): void {
    this.stateService.logout();
    this.router.navigate(['']); // Redirige al usuario a la página de inicio de sesión
  }
  
  toggleDarkMode(isDark: boolean): void { 
    this.darkModeToggled.emit(isDark); 
  }
}