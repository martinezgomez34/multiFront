import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user/user';
import { Donor } from '../models/donor'; 
import { Center } from '../models/center';
import { LocalStorageService } from './local-storage.service';

export interface UserState {
  User: User | Donor | Center; 
  isAuthenticated: boolean;
  user_type: string;
  image: string,
  is_sponsor: boolean
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
      is_sponsor: false
    },
    isAuthenticated: false,
    user_type: '',
    image: '',
    is_sponsor: false // Inicialmente vacío
  });

  readonly User = computed(() => this._state().User);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  readonly userType = computed(() => this._state().user_type); // Computed para user_type
  readonly userImage = computed(() => this._state().image || '');
  readonly sponsor = computed(() => this._state().is_sponsor);

  constructor(private localStorageService: LocalStorageService) {
    const savedUser = this.localStorageService.getUser<User | Donor | Center>();
    const savedUserType = this.localStorageService.getUserType();
    const savedUserImage = this.localStorageService.getUserImage();
    const savedUserSponsor = this.localStorageService.getUserSponsor();
    if (savedUser && savedUserType) {
      this._state.update((state) => ({
        ...state,
        User: savedUser,
        isAuthenticated: true,
        user_type: savedUserType,
        image : savedUserImage,
        is_sponsor: savedUserSponsor
      }));
    }
    console.log('Imagen en estado actualizado:', this._state().image);
  }

  setUser(user: User | Donor | Center, userType: string, image: string, isSponsor: boolean): void {
    console.log('Imagen recibida en setUser:', image);
    this._state.update((state) => {
      const updatedState = {
        ...state,
        User: user,
        isAuthenticated: true,
        user_type: userType,
        image: image,
        is_sponsor: isSponsor
      };
      this.localStorageService.setUser(user);
      this.localStorageService.setUserType(userType);
      this.localStorageService.setUserImage(image);
      this.localStorageService.setUserSponsor(isSponsor);
      console.log('Guardando imagen en localStorage:', image);
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
        user_type: '',
        images: '', // Limpiar tipo de usuario
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
    console.log('User data:', user);
    if (!user) {
      console.error('No user found in state.');
      return null; // Si no hay un usuario logeado
    }
  
    // Verificar si el objeto de usuario tiene 'user_id'
    if ('user_id' in user) {
      console.log('User ID:', user.user_id);
      return user.user_id as number;  // Retornar el valor de user_id
    }
  
    console.error('El usuario no tiene un ID válido.');
    return null;
  }
}  