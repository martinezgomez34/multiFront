import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-news',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.scss']
})
export class UpdateNewsComponent {
  updateNewsForm: FormGroup;
  newsId: string;

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.newsId = this.route.snapshot.paramMap.get('newsId')!;
    this.updateNewsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', Validators.required],
      image: ['']
    });
  }

  onSubmit() {
    if (this.updateNewsForm.valid) {
      const { title, content, status } = this.updateNewsForm.value;
      const imageFile = (document.getElementById('image') as HTMLInputElement).files?.[0];

      const newsData: any = {
        title: title,
        content: content,
        status: status
      };

      if (imageFile) {
        const formData: FormData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('image', imageFile);
        newsData.image = imageFile;
      }

      this.apiService.updateNews(this.newsId, newsData).subscribe(
        response => {
          console.log('News updated successfully', response);
          alert('¡Noticia actualizada con éxito!');
          this.router.navigate(['/news']);
        },
        error => {
          console.error('Error al actualizar la noticia', error);
          alert('Ocurrió un error al actualizar la noticia.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
