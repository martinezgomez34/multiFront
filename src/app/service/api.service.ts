import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { donor, User, NewsItem } from '../models/user/user';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Resource } from '../models/resource';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Registrar usuario
  registerUser(user: any): Observable<any> {
    const formData = new FormData();
    formData.append('user_name', user.user_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);

    return this.http.post(`${this.apiUrl}/register`, formData).pipe(
      catchError((error) => {
        console.error('Error al registrar usuario', error);
        return throwError(() => error);
      })
    );
  }

  // Registrar donante
  registerDonor(donor: any): Observable<any> {
    const formData = new FormData();
    formData.append('user_name', donor.user_name);
    formData.append('last_name', donor.last_name);
    formData.append('email', donor.email);
    formData.append('phone_number', donor.phone_number);
    formData.append('password', donor.password);
    formData.append('image', donor.image);

    return this.http.post(`${this.apiUrl}/registerDon`, formData).pipe(
      catchError((error) => {
        console.error('Error al registrar donante', error);
        return throwError(() => error);
      })
    );
  }


// Editar donante
updateDonor(email: string, updatedDonor: any): Observable<any> {
  const formData = new FormData();
  formData.append('user_name', updatedDonor.user_name);
  formData.append('last_name', updatedDonor.last_name);
  formData.append('new_email', updatedDonor.email);  // Actualiza con el nuevo email si es necesario
  formData.append('password', updatedDonor.password);
  formData.append('phone_number', updatedDonor.phone_number);
  if (updatedDonor.image) {
    formData.append('image', updatedDonor.image, updatedDonor.image.name);
  }

  return this.http.put(`${this.apiUrl}/updateDonors/${email}`, formData).pipe(
    catchError((error) => {
      console.error('Error al actualizar donante', error);
      return throwError(() => error);
    })
  );
}

  // Login de usuario
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError((error) => {
        console.error('Error al iniciar sesión', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener usuario por correo electrónico
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${email}`).pipe(
      catchError((error) => {
        console.error('Error al obtener usuario', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener donante por correo electrónico
  getDonorByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/donor/${email}`).pipe(
      catchError((error) => {
        console.error('Error al obtener donante', error);
        return throwError(() => error);
      })
    );
  }

  getCenterByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/center/${email}`).pipe(
      catchError((error) => {
        console.error('Error al obtener donante', error);
        return throwError(() => error);
      })
    );
  }

  // Eliminar usuario por correo electrónico
  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${email}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar usuario', error);
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

  registerCenter(formData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/registerCen`, formData).pipe(
      catchError(error => {
        console.error('No se pudo registrar el centro', error);
        return throwError(() => error);
      })
    );
  }

  getCenters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/centers`);
  }

  getCentersComunity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/centers/comunity`);
  }

  getCentersBank(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/centers/bank`);
  }

  getCentersChildren(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/centers/shelters`);
  }

  getNewsS(): Observable<any[]> {
    return this.http.get<any>('http://127.0.0.1:8000/news/secret').pipe(
      map((response) => {
        if (response && Array.isArray(response.data)) {
          return response.data.map((item: any) => item.image);
        } else if (Array.isArray(response)) {
          return response.map((item: any) => item.imageUrl || item.image);
        } else {
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching images:', error);
        return of([]); 
      })
    );
  }
  getComunityNeeds(): Observable<any> {
    return this.http.get(`${this.apiUrl}/centers/comunityNeeds`);
  }

  getFoodBankNeeds(): Observable<any> {
    return this.http.get(`${this.apiUrl}/centers/bankNeeds`);
  }

  getSheltersNeeds(): Observable<any> {
    return this.http.get(`${this.apiUrl}/centers/sheltersNeeds`);
  }

  // Métodos con filtros explícitos
  getComunityNeedsWithFilters(needType: string, urgent: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/centers/comunityNeeds/${needType}/${urgent}`);
  }

  getFoodBankNeedsWithFilters(needType: string, urgent: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/centers/bankNeeds/${needType}/${urgent}`);
  }

  getSheltersNeedsWithFilters(needType: string, urgent: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/centers/sheltersNeeds/${needType}/${urgent}`);
  }
  getCenterByName(centerName: string): Observable<any> {
    const url = `${this.apiUrl}/centerName/${centerName}`;
    return this.http.get<any>(url);
  }
  getNeedsByUserNameAndType(userName: string, typeNeed: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getNeedsbyNT/${userName}/${typeNeed}`);
  }
  registerDonation(donorId: number, needId: number, formData: FormData): Observable<any> {
    const apiUrl = `http://127.0.0.1:8000/registerDonation/${donorId}/${needId}`;
    return this.http.post<any>(apiUrl, formData);
  } 
  getRanking(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/donations/ranking`);
  } 
}