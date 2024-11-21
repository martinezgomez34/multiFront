import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-cen',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatFormFieldModule,MatInputModule, ReactiveFormsModule],
  templateUrl: './register-cen.component.html',
  styleUrl: './register-cen.component.scss'
})
export class RegisterCenComponent {
  form: FormGroup;
  selectedFile: File | null = null;
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      user_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type_center: ['', Validators.required],
      needs: [''],
      contact_phone_number: ['', Validators.required],
      contact_social_media: ['', Validators.required],
      contact_others: [''],
      address: ['', Validators.required],
    });
  }
  
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();

      Object.entries(this.form.value).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string);
        }
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      this.apiService.registerCenter(formData).subscribe(
        response => {
          console.log('Centro registrado exitosamente:', response);
          this.router.navigate(['']);
        },
        error => {
          console.error('Error al registrar el centro:', error);
        }
      );
    } else {
      console.error('El formulario no es válido.');
    }
  }
  onCancel(): void {
  }
}
