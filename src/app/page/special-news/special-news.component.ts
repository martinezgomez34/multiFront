import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-special-news',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './special-news.component.html',
  styleUrls: ['./special-news.component.scss']
})
export class SpecialNewsComponent implements AfterViewInit {
  specialNewsForm: FormGroup;
  @ViewChild('imageInput') imageInput?: ElementRef<HTMLInputElement>;  // Declarar como opcional

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // Inicializa el formulario con los controles necesarios
    this.specialNewsForm = this.fb.group({
      title: [''],
      image: ['']
    });
  }

  // Verificar la referencia del elemento después de que la vista ha sido inicializada
  ngAfterViewInit() {
    if (this.imageInput) {
      console.log(this.imageInput);  // Verificar si la referencia está disponible
    }
  }

  onSubmit() {
    if (this.specialNewsForm.valid) {
      const { title } = this.specialNewsForm.value;
      const imageFile = this.imageInput?.nativeElement.files ? this.imageInput.nativeElement.files[0] : null;

      if (imageFile) {
        this.apiService.createSpecialNews(title, imageFile).subscribe(
          response => {
            console.log('Special news created successfully', response);
            alert('¡Noticia especial creada con éxito!');
          },
          error => {
            console.error('Error al crear la noticia especial', error);
            alert('Ocurrió un error al crear la noticia especial.');
          }
        );
      } else {
        alert('Por favor, selecciona una imagen.');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
