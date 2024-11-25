import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user/user';
import { Donor } from '../models/donor'; 
import { Center } from '../models/center';
import { LocalStorageService } from './local-storage.service';

export interface UserState {
  User: User | Donor | Center; 
  isAuthenticated: boolean;
  user_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
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

  readonly User = computed(() => this._state().User);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  readonly userType = computed(() => this._state().user_type); // Computed para user_type

  constructor(private localStorageService: LocalStorageService) {
    const savedUser = this.localStorageService.getUser<User | Donor | Center>();
    const savedUserType = this.localStorageService.getUserType();
    if (savedUser && savedUserType) {
      this._state.update((state) => ({
        ...state,
        User: savedUser,
        isAuthenticated: true,
        user_type: savedUserType
      }));
    }
  }

  setUser(user: User | Donor | Center, userType: string): void {
    this._state.update((state) => {
      const updatedState = {
        ...state,
        User: user,
        isAuthenticated: true,
        user_type: userType
      };
      console.log('Updating state:', updatedState); 
      this.localStorageService.setUser(user)
      this.localStorageService.setUserType(userType)
      return updatedState;
    });
  }

  logout(): void {
    this._state.update((state) => {
      this.localStorageService.removeUser();
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
        user_type: '' // Limpiar tipo de usuario
      };
    });
  }

  private determineUserType(user: User | Donor | Center): string {
    if ('type_center' in user) {
      return 'center';
    } else if ('is_sponsor' in user) {
      return 'donor';
    } else {
      return 'user';
    }
  }

  isDonor(): boolean {
    const user = this.User();
    return user && 'is_sponsor' in user ? user.is_sponsor === true : false;
  }
  
  isCenter(): boolean {
    const user = this.User();
    return user && 'type_center' in user ? user.type_center !== undefined : false;
  }
  
  isRegularUser(): boolean {
    const user = this.User();
    return user && 'is_verified' in user ? user.is_verified !== undefined : false;
  }
  
  getUserId(): number | null {
    const user = this.User();

    if (!user) {
      return null; // Si no hay un usuario logeado
    }

    // Verificar si el objeto de usuario tiene 'user_id'
    if ('user_id' in user) {
      return user.user_id as number;  // Retornar el valor de user_id
    }

    console.error('El usuario no tiene un ID válido.');
    return null; // Si no se encuentra un ID válido
  }
}