import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user/user';
import { Donor } from '../models/donor';
import { Center } from '../models/center';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface UserState {
  User: User | Donor | Center;
  isAuthenticated: boolean;
  user_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);  // Decodifica el token JWT
    } catch (error) {
      console.error('Error decodificando el token', error);
      return null;
    }
  }

  // Inicialización de la señal de estado
  private _state = signal<UserState>({
    User: {
      user_name: '', 
      email: '', 
      password: '', 
      is_verified: false, 
      is_admin: false, 
      image: '', 
      is_sponsor: false
    },
    isAuthenticated: false,
    user_type: '' // Inicialmente vacío
  });

  // Computed para obtener los valores derivados
  readonly User = computed(() => this._state().User);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  readonly userType = computed(() => this._state().user_type);

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    const savedUser = this.localStorageService.getUser<User | Donor | Center>();
    const savedUserType = this.localStorageService.getUserType();
    if (savedUser && savedUserType) {
      this._state.update((state) => ({
        ...state,
        User: savedUser,
        isAuthenticated: true,
        user_type: savedUserType
      }));
    } else {
      // Si no hay usuario o tipo guardado, podemos llamar a `logout()` aquí
      this.logout();
    }
  }

  // Método para actualizar el estado y guardar los datos en el almacenamiento local
  setUser(user: User | Donor | Center, userType: string): void {
    this._state.update((state) => {
      const updatedState = {
        ...state,
        User: user,
        isAuthenticated: true,
        user_type: userType
      };
      // Guardar los cambios en el localStorage
      this.localStorageService.setUser(user);
      this.localStorageService.setUserType(userType);
      console.log('Updating state:', updatedState); // Verificar actualización
      return updatedState;
    });
  }

  // Método de logout: limpia el estado y localStorage
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Solo intenta remover los elementos de localStorage si estamos en el navegador
      this.localStorageService.removeUser();
      this.localStorageService.removeUserType();
      localStorage.removeItem('token'); 
    }

    this._state.update((state) => {
      return {
        ...state,
        User: {
          user_name: '',
          email: '',
          password: '',
          is_verified: false,
          is_admin: false,
          image: '',
          is_sponsor: false
        },
        isAuthenticated: false,
        user_type: ''
      };
    });
    this.router.navigate(['/Login']);
  }

  // Método para verificar si el usuario es un donante
  isDonor(): boolean {
    const user = this.User();
    return user && 'is_sponsor' in user ? user.is_sponsor === true : false;
  }

  // Método para verificar si el usuario es un centro
  isCenter(): boolean {
    const user = this.User();
    return user && 'type_center' in user ? user.type_center !== undefined : false;
  }

  // Método para verificar si el usuario es regular
  isRegularUser(): boolean {
    const user = this.User();
    return user && 'is_verified' in user ? user.is_verified !== undefined : false;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null; // O el nombre que uses para el token
  }

  logoutObservable(): Observable<void> {
    return new Observable<void>((observer) => {
      // Aquí haces las tareas necesarias de logout (limpiar localStorage, actualizar estado, etc.)
      if (typeof window !== 'undefined' && window.localStorage) {
        this.localStorageService.removeUser();
        this.localStorageService.removeUserType();
      }

      // Limpiar el estado del usuario
      this._state.update((state) => ({
        ...state,
        User: {
          user_name: '',
          email: '',
          password: '',
          is_verified: false,
          is_admin: false,
          image: '',
          is_sponsor: false
        },
        isAuthenticated: false,
        user_type: ''
      }));

      // Emitir la notificación de que el logout se ha completado
      observer.next();
      observer.complete();  // Completar el Observable
    });
  }
}