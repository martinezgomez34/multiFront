import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { RouterLink } from '@angular/router';
import { StateService } from '../../service/state.service';
import { Donor } from '../../models/donor';
import { Center } from '../../models/center';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private stateService: StateService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.loginUser(email, password).subscribe(
        (response: any) => {
          if (response && response.access_token) {
            localStorage.setItem('token', response.access_token);
            this.apiService.getUserByEmail(email).subscribe(
              (user: any) => {
                if (user) {
                  // Determinar el tipo de usuario
                  const userType = response.user_type || 'user';
                  if ('is_sponsor' in user) {
                    this.stateService.setUser(user as Donor, userType);
                  } else if ('type_center' in user) {
                    this.stateService.setUser(user as Center, userType);
                  } else {
                    this.stateService.setUser(user as User, userType);
                  }
                  alert('¡Inicio de sesión exitoso!');
                  this.router.navigate(['']);
                }
              },
              error => {
                console.error('Error fetching user:', error);
                alert('No se pudo obtener los datos del usuario. Inténtalo de nuevo.');
              }
            );
          }
        },
        error => {
          console.error('Login error:', error);
          if (error.status === 401 && error.error.detail === 'Contraseña incorrecta') {
            alert('La contraseña ingresada es incorrecta. Por favor, verifica e intenta nuevamente.');
          } else if (error.status === 401) {
            alert('Credenciales incorrectas. Verifica tu correo electrónico o contraseña.');
          } else {
            alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
          }
        }
      );
    }
  }
  
}