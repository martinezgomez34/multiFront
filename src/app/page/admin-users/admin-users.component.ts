import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    if (confirm('¿Estás seguro de que quieres eliminar a este donante?')) {
      this.apiService.deleteDonor(email).subscribe(
        () => {
          alert('Donante eliminado con éxito');
          this.getDonors(); // Actualizar la lista de donantes
        },
        (error) => {
          console.error('Error al eliminar el donante', error);
        }
      );
    }
  }
  
}
