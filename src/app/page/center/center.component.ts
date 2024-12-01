import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Observable } from 'rxjs';
type ApiServiceMethods = 'getCenters' | 'getCentersComunity' | 'getCentersChildren' | 'getCentersBank';
@Component({
  selector: 'app-centro',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.scss'
})
export class CenterComponent {
  @Input() isDarkMode!: boolean;
  centers: any[] = [];
  activeCategory: string = 'Todos';
  sponsors: any[] = [];
  private apiBaseUrl = 'http://127.0.0.1:8000';

  // Definimos las categorías y los métodos asociados
  categories: { name: string; method: ApiServiceMethods }[] = [
    { name: 'Todos', method: 'getCenters' },
    { name: 'Centros comunitarios', method: 'getCentersComunity' },
    { name: 'Casas hogares', method: 'getCentersChildren' },
    { name: 'Bancos de alimentos', method: 'getCentersBank' },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Cargar todos los centros al inicio
    this.loadCenters('getCenters');
    this.apiService.getTopSponsors().subscribe(
      (data) => {
        this.sponsors = data.top_sponsors.map((sponsor: any) => ({
          ...sponsor,
          images: `${this.apiBaseUrl}${sponsor.images}`
        }));
      },
      (error) => {
        console.error('Error al obtener los patrocinadores:', error);
      }
    );
  }

  loadCenters(method: ApiServiceMethods): void {
    const selectedCategory = this.categories.find((cat) => cat.method === method);
    this.activeCategory = selectedCategory ? selectedCategory.name : 'Todos';
  
    this.apiService[method]().subscribe({
      next: (data: any) => {
        console.log(`Datos recibidos (${this.activeCategory}):`, data);
  
        // Ajustar dependiendo de la clave dinámica
        const key = Object.keys(data).find((k) => Array.isArray(data[k]));
        this.centers = key ? data[key] : [];
  
        console.log(`Centros cargados (${this.activeCategory}):`, this.centers);
      },
      error: (err: any) => {
        console.error(`Error al obtener los centros (${this.activeCategory}):`, err);
      },
    });
  }
}
