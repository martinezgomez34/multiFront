import { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state.service';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-donation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-donation.component.html',
  styleUrl: './my-donation.component.scss'
})
export class MyDonationComponent implements OnInit {
  donations: any[] = [];

  constructor(private id: StateService, private api: ApiService) {}

  ngOnInit(): void {
    setTimeout(() => {
      const user_id = this.id.getUserId();
      console.log('User ID after timeout:', user_id);  // Verifica el ID después de un pequeño retraso
      if (user_id) {
        this.fetchDonations();
      } else {
        console.error('No se pudo obtener un user_id válido');
      }
    }, 100); // Ajusta el tiempo según lo que necesites
  }

  // Fetch donations del usuario actual
  fetchDonations(): void {
    const user_id = this.id.getUserId(); // Obtener user_id del localStorage
    console.log('Fetching donations for user_id:', user_id); // Verificar el user_id
  
    if (!user_id) {
      console.error('No user_id found');
      return; // Detener si no hay un user_id válido
    }
  
    this.api.getDonations(user_id).subscribe((data: any) => {
      this.donations = data.map((donation: any) => ({
        ...donation,
        image: this.addBaseUrlToImage(donation.image), // Añadir la URL base a las imágenes
        isEditing: false
      }));
    });
  }
  
  
  // Función para agregar la URL base a las imágenes
  addBaseUrlToImage(imageUrl: string): string {
    const baseUrl = 'http://127.0.0.1:8000';
    if (imageUrl && !imageUrl.startsWith(baseUrl)) {
      return baseUrl + imageUrl; // Concatenar la URL base si no está presente
    }
    return imageUrl; // Si ya tiene la URL base, devolverla tal cual
  }
  

  // Habilitar modo de edición
  enableEdit(donation: any): void {
    if (!donation.complete) {  // Solo permitir editar si no está completada
      donation.isEditing = true;
    }
  }

  // Guardar cambios en la donación (usando donation_id en lugar de user_id)
  saveChanges(donation: any): void {
    const donation_id = donation.donation_id; // Obtener donation_id
    const updatedDonation = new FormData();

    if (donation.newImageFile) {
      updatedDonation.append('image', donation.newImageFile); // Adjuntar archivo si hay cambios
    }
    updatedDonation.append('comentary', donation.comentary);

    this.api.updateDonation(donation_id, updatedDonation).subscribe(() => {
      donation.isEditing = false; // Salir del modo edición
      this.fetchDonations(); // Refrescar la lista
    });
  }

  // Eliminar una donación (usando donation_id en lugar de user_id)
  deleteDonation(donationId: number): void {
    this.api.deleteDonation(donationId).subscribe(() => {
      this.donations = this.donations.filter((d) => d.donation_id !== donationId);
    });
  }

  // Manejar cambio de archivo para imagen
  onFileChange(event: any, donation: any): void {
    const file = event.target.files[0];
    if (file) {
      donation.newImageFile = file; // Almacenar archivo temporalmente
      donation.image = URL.createObjectURL(file); // Crear vista previa de la imagen
    }
  }
}
