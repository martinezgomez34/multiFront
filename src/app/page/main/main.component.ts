import { Component, Input, HostBinding, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableNewsComponent } from '../../component/table/table-news/table-news.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TableNewsComponent,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnChanges {
  @Input() isDarkMode!: boolean;
  images: string[] = [];
  currentSlide: number = 0;

  constructor(private newsService: ApiService) {}

  ngOnInit(): void {
    this.loadFirstImage(); 
  }

  ngOnChanges(): void {
    this.loadSecondImage();
  }

  loadFirstImage(): void {
    this.newsService.getNewsS().subscribe(
      (images) => {
        console.log('Received images:', images);
        if (images && images[0]) {
          const baseUrl = 'http://127.0.0.1:8000'; 
          this.images[0] = images[0].startsWith('http') ? images[0] : baseUrl + images[0];
          console.log('First image URL:', this.images[0]);
        } else {
          console.error('No image data received for the first image.');
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }


  loadSecondImage(): void {
    if (this.isDarkMode) {
      this.newsService.getNewsS().subscribe(
        (images) => {
          console.log('Received images in dark mode:', images);
          if (images && images[1]) {
            const baseUrl = 'http://127.0.0.1:8000'; 
            this.images[1] = images[1].startsWith('http') ? images[1] : baseUrl + images[1];
            console.log('Second image URL (Dark Mode):', this.images[1]); 
          } else {
            console.error('No image data received for the second image.');
          }
        },
        (error) => {
          console.error('Error fetching second image:', error);
        }
      );
    }
  }

  setCurrentSlide(index: number): void {
    this.currentSlide = index;
  }
}

