import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    // Ensures this is only called in the browser environment
    try {
      return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    } catch (e) {
      return false; // In case of any error (e.g., in SSR)
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  getUser<T>(): T | null {
    const user = this.getItem('user');
    return user ? JSON.parse(user) as T : null;
  }

  setUser<T>(user: T): void {
    this.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    this.removeItem('user');
  }

  setUserType(userType: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('user_type', userType);
    }
  }

  getUserType(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem('user_type') : null;
  }
  setUserImage(userImage: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('images', userImage);
    }
  }
  getUserImage(): string {
    const baseUrl = "http://127.0.0.1:8000";
    const imagePath = this.isLocalStorageAvailable() ? localStorage.getItem('images') : null;
    return imagePath ? `${baseUrl}${imagePath}` : ''; 
  }  
  setUserSponsor(is_sponsor: boolean): void {
    if (this.isLocalStorageAvailable()) {
      // Convertir el booleano a cadena
      localStorage.setItem('is_sponsor', is_sponsor.toString());
    }
  }
  
  getUserSponsor(): boolean {
    // Verifica si estamos en el navegador antes de intentar acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const isSponsor = localStorage.getItem('is_sponsor');
      console.log(isSponsor);
      
      return isSponsor === 'true';  // Si el valor es 'true' (como cadena), devolver true
    }
    return false; // Si no estamos en el navegador, devuelve un valor predeterminado
  }  
}
