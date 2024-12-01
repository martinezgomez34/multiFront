import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { News, NewsResponse } from '../../models/news';
import { FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'], // Corregir estilo plural
})
export class NewsComponent implements OnInit{
  @Input() isDarkMode!: boolean;
  newsList: News[] = [];
  centerEmail = 'luiguipro17@gmail.com';  // Ejemplo de correo del centro

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.apiService.getNewsByCenterEmail(this.centerEmail).subscribe(
      (response: NewsResponse) => {
        const baseUrl = 'http://127.0.0.1:8000';
        this.newsList = response.data.map(news => ({
          ...news,
          image: news.image.startsWith('http') ? news.image : `${baseUrl}${news.image}`
        }));
      },
      error => {
        console.error('Error al cargar las noticias', error);
      }
    );
  }

  editNews(newsId: string) {
    this.router.navigate(['NewsCenter/DeleteNews', newsId]);
  }

  deleteNews(newsId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.apiService.deleteNews(newsId).subscribe(
        response => {
          console.log('Noticia eliminada con éxito', response);
          this.loadNews(); // Recargar la lista de noticias después de eliminar
        },
        error => {
          console.error('Error al eliminar la noticia', error);
        }
      );
    }
  }
}
