import { Component, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  @Input() isDarkMode!: boolean;
  ranking: any[] = [];
  topDonor: any = null;
  private readonly baseUrl = 'http://127.0.0.1:8000'; // Cambia esto según tu dominio real

  constructor(private donationsService: ApiService) {}

  ngOnInit(): void {
    this.donationsService.getRanking().subscribe({
      next: (data) => {
        // Transformar las URLs de las imágenes
        this.topDonor = {
          ...data.top_donor,
          donor_image: this.concatenateImageUrl(data.top_donor.donor_image)
        };
        this.ranking = data.ranking.map((donor: any) => ({
          ...donor,
          donor_image: this.concatenateImageUrl(donor.donor_image)
        }));
      },
      error: (err) => {
        console.error('Error fetching ranking:', err);
      }
    });
  }

  private concatenateImageUrl(imagePath: string): string {
    return `${this.baseUrl}${imagePath}`;
  }
}