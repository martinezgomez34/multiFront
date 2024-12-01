import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CommonModule } from '@angular/common';
import { StateService } from './service/state.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontMulti';

  isDarkMode = false; 

  toggleDarkMode(isDark: boolean): void { 
    this.isDarkMode = isDark; 
  }

  constructor(
    private stateService: StateService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.localStorageService.getDarkMode();

    if (typeof window !== 'undefined' && window.localStorage) {
      const token = this.stateService.getToken();  // Obtener el token almacenado
      if (token) {
        const decodedToken = this.stateService.decodeToken(token);
        const expirationTime = decodedToken?.exp * 1000; // Asegúrate de que `exp` exista
  
        // Verificar si el token ha expirado
        if (expirationTime < Date.now()) {
          // Si el token ha expirado, llamar al método logoutObservable y suscribirse a la respuesta
          this.stateService.logoutObservable().subscribe(() => {
            // Redirigir al login después de hacer logout
            
          });
        }
      }
    }
  }  
}
