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


  registerNeed(need: any, center_fk: number): Observable<any> {
    const formData = new FormData();
    formData.append('type_need', need.type_need);
    formData.append('amount_required', need.amount_required.toString());
    formData.append('urgency', need.urgency.toString());

    return this.http.post(`${this.apiUrl}/registerNeed/${center_fk}`, formData).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  updateNeed(need_id: number, need: any): Observable<any> {
    const formData = new FormData();
    if (need.type_need) {
      formData.append('type_need', need.type_need);
    }
    if (need.amount_required !== undefined) {
      formData.append('amount_required', need.amount_required.toString());
    }
    if (need.complete !== undefined) {
      formData.append('complete', need.complete.toString());
    }
    if (need.urgency !== undefined) {
      formData.append('urgency', need.urgency.toString());
    }

    return this.http.put(`${this.apiUrl}/updateNeed/${need_id}`, formData).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  deleteNeed(need_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteNeed/${need_id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getAllNeeds(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getNeeds`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getNeedById(need_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getNeeds/${need_id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getNeedsByCenterName(center_name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getNeedsbyName/${center_name}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
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
}