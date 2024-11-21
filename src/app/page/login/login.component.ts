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
        (response) => {
          if (response && response.access_token) {
            this.apiService.getUserByEmail(email).subscribe(
              (user) => {
                if (user) {
                  if ('last_name' in user.user) {
                    this.stateService.setUser(user.user as Donor);
                  } else if ('contact' in user.user) {
                    this.stateService.setUser(user.user as Center);
                  } else {
                    this.stateService.setUser(user.user as User);
                  }
                  alert('¡Inicio de sesión exitoso!');
                  this.router.navigate(['']);
                }
              },
              (error) => {
                console.error('Error fetching user:', error);
              }
            );
          }
        },
        (error) => {
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