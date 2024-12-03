import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esto eliminará el centro y sus necesidades asociadas, pero conservará las donaciones relacionadas.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00bcd4', // Botón cian
      cancelButtonColor: '#00796b', // Botón cian oscuro
      background: 'linear-gradient(to bottom, #006064, #000000)', // Fondo degradado cian
      color: 'white', // Texto cian oscuro
      customClass: {
        popup: 'text-lg', // Texto del contenido
        title: 'text-xl font-bold', // Título más grande
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCenter(email);
      }
    });
  }
  
  deleteCenter(email: string): void {
    this.apiService.deleteCenter(email).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Centro eliminado!',
          text: 'El centro se eliminó exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0097a7', // Cian para éxito
          background: 'linear-gradient(to bottom, #006064, #000000)', // Fondo degradado cian
          color: 'white', // Texto cian oscuro
        });
        this.loadCenters(); // Recargar la lista de centros
      },
      error: (err) => {
        console.error('Error al eliminar el centro:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el centro. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#00796b', // Cian oscuro para errores
          background: 'linear-gradient(to bottom, #006064, #000000)', // Fondo degradado cian
          color: 'white', // Texto cian oscuro
        });
      },
    });
  }
  
}
