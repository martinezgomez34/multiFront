import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StateService } from '../../service/state.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() isDarkMode!: boolean;
  @Output() darkModeToggled = new EventEmitter<boolean>();

  showMenu = false;
  menuOpen = false;
  
  // Variable para almacenar el tipo de usuario
  userType: string = '';

  stateService = inject(StateService);

  constructor(private router: Router, private local : LocalStorageService) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el tipo de usuario
    this.userType = this.stateService.userType();
    console.log('Imagen en stateService:', this.stateService.userImage);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout(): void {
    this.stateService.logout();
    this.router.navigate(['']); // Redirige al usuario a la página de inicio
  }

  toggleDarkMode(isDark: boolean): void {
    this.darkModeToggled.emit(isDark);
  }

  // Métodos para verificar el tipo de usuario
  isDonor(): boolean {
    return this.userType === 'donor';
  }

  isCenter(): boolean {
    return this.userType === 'center';
  }

  isRegularUser(): boolean {
    return this.userType === 'user';
  }
  getImage(): string{
    return this.local.getUserImage()
  }
  getSponsor(): boolean{
    return this.local.getUserSponsor()
  }
}
