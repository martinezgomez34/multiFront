import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { RouterLink } from '@angular/router';

export function gmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (email && !email.endsWith('@gmail.com')) {
    return { gmailOnly: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  @Input() isDarkMode!: boolean;
  form: FormGroup;
  selectedFile: File | null = null;
  erroMesage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.form = this.fb.group({
      user_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, gmailValidator]],
      password: ['', Validators.required],
      phone_number: ['', Validators.required], // Asegúrate de que esta línea exista
    });
    this.form.get('phone_number')?.valueChanges.subscribe((value) => {
      if (value && !value.startsWith('+52 ')) {
        this.form.get('phone_number')?.setValue('+52 ' + value, { emitEvent: false });
      }
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (allowedTypes.includes(file.type)) {
            this.selectedFile = file;
        } else {
            this.erroMesage = "Solo aceptamos imagenes";
            fileInput.value = '';
        }
    }
}

  onSubmit(): void {
    if (this.form.valid) {
      const donorData = { ...this.form.value, image: this.selectedFile };
      this.apiService.registerDon(donorData).subscribe(
        response => {
          console.log('Usuario registrado exitosamente:', response);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }

  
  onCancel(): void {
  }
}
