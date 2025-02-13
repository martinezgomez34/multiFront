import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
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
}
