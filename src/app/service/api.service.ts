import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { donor, User } from '../models/user/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  createUser(item: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, item);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => error);
      })
    );
  }
  registerDon(donor: donor): Observable<any> {
    const formData = new FormData();
    formData.append('user_name', donor.user_name);
    formData.append('last_name', donor.last_name);
    formData.append('email', donor.email);
    formData.append('password', donor.password);
    formData.append('phone_number', donor.phone_number);
    if (donor.image) {
      formData.append('image', donor.image, donor.image.name);
    }
  
    return this.http.post(`${this.apiUrl}/registerDon`, formData).pipe(
      catchError(error => {
        console.error('No se pudo registrar el usuario', error);
        return throwError(() => error);
      })
    );
  }
  
}