import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user/user';
import { Donor } from '../models/donor'; // Importa el modelo de Donor
import { Center } from '../models/center'; // Importa el modelo de Center

export interface UserState {
  User: User | Donor | Center; // Permite que sea de tipo User, Donor o Center
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

  setUser(user: User | Donor | Center): void {
    if (!user.user_name) {
      console.error('El user_name no está definido');
      return; // Si user_name está vacío o indefinido, no actualiza el estado
    }

    this._state.update((state) => {
      const updatedState = {
        ...state,
        User: user, // Actualiza con la información del usuario, ya sea User, Donor o Center
        isAuthenticated: true
      };
      console.log('Updating state:', updatedState); // Verifica el nuevo estado
      return updatedState;
    });
  }

  logout(): void {
    this._state.update((state) => ({
      ...state,
      User: {
        ...state.User,
        user_name: ''
      },
      isAuthenticated: false
    }));
  }
}
