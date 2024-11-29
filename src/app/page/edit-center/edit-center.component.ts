import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-center',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-center.component.html',
  styleUrls: ['./edit-center.component.scss']
})
export class EditCenterComponent {
  updateCenterForm: FormGroup;
  imageFile: File | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.updateCenterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      user_name: ['', Validators.required],
      new_email: ['', Validators.email],
      password: [''],
      type_center: [''],
      needs: [''],
      contact_phone_number: [''],
      contact_social_media: [''],
      contact_others: [''],
      address: [''],
      is_active: [false],
      is_verified: [false],
      is_sponsor: [false],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.imageFile = file ? file : null;
  }

  updateCenter(): void {
    if (this.updateCenterForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    this.isLoading = true;
    const formData = this.updateCenterForm.value;
    if (this.imageFile) {
      formData.image = this.imageFile;
    }

    const email = formData.email;
    delete formData.email;

    this.apiService.updateCenter(email, formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Centro actualizado exitosamente.';
        this.errorMessage = '';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al actualizar el centro. Por favor, intenta nuevamente.';
        console.error(error);
      }
    });
  }
}
