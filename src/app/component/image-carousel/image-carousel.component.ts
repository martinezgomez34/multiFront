import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [
  CommonModule
  ],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent implements OnInit {
  @Input() images: { url: string; title: string }[] = [];
  currentSlide: number = 0;
  autoChangeInterval: any;

  constructor() {}

  ngOnInit(): void {
    // Cambiar automáticamente las diapositivas cada 5 segundos (5000 ms)
    this.autoChangeInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Ajusta el intervalo según lo necesites
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo cuando el componente sea destruido
    if (this.autoChangeInterval) {
      clearInterval(this.autoChangeInterval);
    }
  }

  // Navegar al siguiente slide
  nextSlide(): void {
    if (this.currentSlide < this.images.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Regresar al primer slide si estamos al final
    }
  }

  // Navegar al slide anterior
  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.images.length - 1; // Regresar al último slide si estamos en el primero
    }
  }

  // Cambiar al slide seleccionado
  setCurrentSlide(index: number): void {
    this.currentSlide = index;
  }
}