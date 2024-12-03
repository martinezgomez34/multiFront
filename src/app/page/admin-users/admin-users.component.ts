import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  donors: any[] = [];
  filteredDonors: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDonors();
  }

  getDonors(): void {
    this.apiService.getAllDonors().subscribe(
      (data) => {
        console.log('Datos obtenidos:', data);
        this.donors = data;
        this.filteredDonors = data; // Inicialmente muestra todos
      },
      (error) => {
        console.error('Error al obtener los donantes', error);
      }
    );
  }
  

  searchDonors(): void {
    this.filteredDonors = this.donors.filter((donor) =>
      `${donor.user_name} ${donor.last_name}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }


  // Eliminar un donante
deleteDonor(email: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Estás a punto de eliminar al donante con el correo ${email}. Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#00bcd4', // Botón cian
    cancelButtonColor: '#00796b', // Botón cian más oscuro
    background: 'linear-gradient(to bottom, #006064, #000000)', // Fondo degradado de tonos cian claros
    color: 'white', // Texto cian oscuro
    customClass: {
      popup: 'text-lg', // Texto del contenido
      title: 'text-xl font-bold', // Título más grande
    },
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiService.deleteDonor(email).subscribe(
        () => {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El donante ha sido eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0097a7', // Verde cian para éxito
            background: 'linear-gradient(to bottom, #006064, #000000)', // Fondo degradado igual
            color: 'white', // Texto cian oscuro
          });
          this.getDonors(); // Actualizar la lista de donantes
        },
        (error) => {
          console.error('Error al eliminar el donante', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el donante. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#00796b', // Cian oscuro para errores
            background: 'linear-gradient(to bottom, #006064, #000000)', // Fondo degradado igual
            color: 'white', // Texto cian oscuro
          });
        }
      );
    }
  });
}

  
}
