import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user/user';
import { Donor } from '../models/donor'; 
import { Center } from '../models/center';
import { LocalStorageService } from './local-storage.service';

export interface UserState {
  User: User | Donor | Center; 
  isAuthenticated: boolean;
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
    isAuthenticated: false
  });

  readonly User = computed(() => this._state().User);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);

  constructor(private localStorageService: LocalStorageService) {
    const savedUser = this.localStorageService.getUser<User | Donor | Center>();
    if (savedUser) {
      this._state.update((state) => ({
        ...state,
        User: savedUser,
        isAuthenticated: true
      }));
    }
  }

  setUser(user: User | Donor | Center): void {
    if (!user.user_name) {
      console.error('El user_name no está definido');
      return; 
    }

    this._state.update((state) => {
      const updatedState = {
        ...state,
        User: user,
        isAuthenticated: true
      };
      console.log('Updating state:', updatedState); 
      this.localStorageService.setUser(user)
      return updatedState;
    });
    
  }

  logout(): void {
    this._state.update((state) => {
      this.localStorageService.removeUser();
      return {
        ...state,
        User: {
          user_name: '', // Limpia el nombre de usuario
          email: '',
          password: '',
          is_verified: false,
          is_admin: false,
          image: '',
          is_sponsor: false
        },
        isAuthenticated: false
      };
    });
  }
  
}
