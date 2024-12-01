import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from '../../component/image-carousel/image-carousel.component';
import { TableNewsComponent } from '../../component/table/table-news/table-news.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ImageCarouselComponent, TableNewsComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnChanges {
  isDarkMode: boolean = false;
  images: { url: string; title: string }[] = [];

  constructor(private newsService: ApiService) {}

  ngOnInit(): void {
    // Cargar el estado del modo oscuro desde el localStorage
    this.isDarkMode = this.getDarkMode();
    this.loadImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDarkMode']) {
      this.loadImages(); // Actualiza las imágenes si el modo oscuro cambia
    }
  }

  loadImages(): void {
    // Agregar el logo como la primera imagen
    const logo = {
      url: this.isDarkMode ? 'donamedark.jpg' : 'donamelite.jpg',
      title: 'Logo de presentación',
    };

    this.newsService.getNewsS().subscribe(
      (images) => {
        const baseUrl = 'http://127.0.0.1:8000';
        // Combina el logo con las imágenes reales del carrusel
        this.images = [logo, ...images.map((img: { title: string, image: string }) => ({
          url: img.image.startsWith('http') ? img.image : `${baseUrl}${img.image}`,
          title: img.title,
        }))];
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  // Método para obtener el estado del darkMode desde localStorage
  getDarkMode(): boolean {
    const darkMode = localStorage.getItem('darkMode');
    return darkMode === 'true';  // Devuelve true si el valor en localStorage es 'true'
  }

  // Método para establecer el estado del darkMode en localStorage
  setDarkMode(isDark: boolean): void {
    localStorage.setItem('darkMode', isDark.toString());  // Almacena 'true' o 'false' como string
  }

  // Método para cambiar entre modo claro y oscuro
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setDarkMode(this.isDarkMode);  // Guardamos el nuevo estado en localStorage
    this.loadImages();  // Recargamos las imágenes con el nuevo modo
  }
}
