import { Component, Inject, Input } from '@angular/core';
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
import Swal from 'sweetalert2';

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
  @Input() isDarkMode!: boolean;
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
                  const userType = response.user_type || 'user';
                  const images = response.images || '';
                  const is_sponsor = response.is_sponsor || '';
                  console.log('Imagen recibida en respuesta:', response.images); 
                  console.log('Es sponsor:', is_sponsor);// Asegúrate de que recibas el tipo de usuario
                  if ('last_name' in user.user) {
                    this.stateService.setUser(user.user as Donor, userType, images, is_sponsor);
                  } else if ('type_center' in user.user) {
                    this.stateService.setUser(user.user as Center, userType, images, is_sponsor);
                  } else {
                    this.stateService.setUser(user.user as User, userType, images, is_sponsor);

                  }
                  Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Has iniciado sesión correctamente.',
                    icon: 'success',
                    background: 'linear-gradient(to bottom, #006064, #000000)', // gradiente de cian oscuro a negro
                    color: 'white', // texto blanco
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0097a7', // botón cian más oscuro
                    customClass: {
                      title: 'text-xl font-semibold', // título grande y negrita
                      popup: 'text-lg', // contenido de la alerta
                    },
                  });
                  this.router.navigate(['']);
                }
                
              },
              error => {
                console.error('Error fetching user:', error);
                

              }

            );
          }
        },
        error => {
          console.error('Login error:', error);
          if (error.status === 401 && error.error.detail === 'Contraseña incorrecta') {
            Swal.fire("Credenciales incorrectas");
          } else if (error.status === 401) {
            Swal.fire("Credenciales incorrectas");
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Credenciales incorrectas',
              icon: 'error',
              background: 'linear-gradient(to bottom, #006064, #000000)', // gradiente de cian oscuro a negro
              color: 'white',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0097a7',
              customClass: {
                title: 'text-xl font-semibold',
                popup: 'text-lg',
              },
            });
          }
        }
      );
    }
  }
  
}