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
    private stateService: StateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.loginUser(email, password).subscribe(response => {
        console.log('Login successful:', response);
  
        if (response && response.access_token) {
          // Si el login es exitoso, obtener información del usuario
          this.apiService.getUserByEmail(email).subscribe(user => {
            console.log('User fetched:', user);
  
            if (user) {
              // Verifica si el usuario es un Donor o Center
              if ('last_name' in user.user) {
                // Si tiene 'last_name', es un Donor
                this.stateService.setUser(user.user as Donor);
              } else if ('contact' in user.user) {
                // Si tiene 'contact', es un Center
                this.stateService.setUser(user.user as Center);
              } else {
                // Es un usuario general
                this.stateService.setUser(user.user as User);
              }
            } else {
              console.error('El usuario no tiene "user_name" o está indefinido:', user);
            }
          }, error => {
            console.error('Error fetching user:', error);
          });
        }
      }, error => {
        console.error('Login error:', error);
      });
    }
  }
  
}