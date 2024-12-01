import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news';
import { FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-news',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.scss'
})
export class CreateNewsComponent {
  form: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', Validators.required],
      image: [null],
    });
  }

  // Maneja la selección de la imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const { title, content, status } = this.form.value;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', status);

      // Agrega la imagen si está seleccionada
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }

      this.apiService.createNews(formData).subscribe(
        (response) => {
          console.log('Noticia creada con éxito', response);
          this.router.navigate(['/NewsCenter']);
        },
        (error) => {
          console.error('Error al crear la noticia', error);
        }
      );
    }
  }
}