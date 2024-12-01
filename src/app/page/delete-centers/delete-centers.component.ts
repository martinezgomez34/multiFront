import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-centers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-centers.component.html',
  styleUrls: ['./delete-centers.component.scss']
})
export class DeleteCentersComponent implements OnInit {
  centers: any[] = [];
  searchEmail: string = '';
  searchResult: any | null = null; 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCenters(); // Carga los centros al inicializar el componente
  }

  loadCenters(): void {
    this.apiService.getCenters().subscribe({
      next: (data: any) => {
        const key = Object.keys(data).find((k) => Array.isArray(data[k]));
        this.centers = key ? data[key] : [];
        console.log('Centros cargados:', this.centers);
      },
      error: (err) => {
        console.error('Error al cargar los centros:', err);
        alert('Error al cargar los centros. Intente nuevamente.');
      }
    });
  }

  searchCenter(): void {
    if (!this.searchEmail) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    this.apiService.getCenterByEmail(this.searchEmail).subscribe({
      next: (center) => {
        this.searchResult = center; // Se almacena el resultado en searchResult
        console.log('Centro encontrado:', center);
      },
      error: (err) => {
        console.error('Error al buscar el centro:', err);
        this.searchResult = null;
        alert('No se encontró un centro con ese correo.');
      }
    });
  }

  confirmDeleteCenter(email: string): void {
    const confirmed = confirm(
      '¿Estás seguro de que deseas eliminar este centro? Esto eliminará el centro y sus necesidades, pero conservará las donaciones asociadas.'
    );
    if (confirmed) {
      this.deleteCenter(email);
    }
  }

  deleteCenter(email: string): void {
    this.apiService.deleteCenter(email).subscribe({
      next: (response) => {
        alert('Centro eliminado exitosamente.');
        this.loadCenters(); // Recargar los centros
      },
      error: (err) => {
        console.error('Error al eliminar el centro:', err);
        alert('No se pudo eliminar el centro. Intente nuevamente.');
      }
    });
  }
}
