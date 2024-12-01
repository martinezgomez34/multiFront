import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-news',
  standalone: true,
  imports: [],
  templateUrl: './delete-news.component.html',
  styleUrls: ['./delete-news.component.scss']
})
export class DeleteNewsComponent {
  newsId: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.newsId = this.route.snapshot.paramMap.get('newsId')!;
  }

  deleteNews() {
    this.apiService.deleteNews(this.newsId).subscribe(
      response => {
        console.log('News deleted successfully', response);
        alert('¡Noticia eliminada con éxito!');
        this.router.navigate(['/news']);
      },
      error => {
        console.error('Error al eliminar la noticia', error);
        alert('Ocurrió un error al eliminar la noticia.');
      }
    );
  }
}
