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
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) as T : null;
    }
    return null;
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

  removeUserType(): void {
    localStorage.removeItem('userType');
  }

  getUserType(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem('user_type') : null;
  }
}
