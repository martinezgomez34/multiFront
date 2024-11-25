import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-donor',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.scss'],
})
export class EditDonorComponent {
  donor: any = {
    user_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    image: null,
  };

  selectedImage: File | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.apiService.getDonorByEmail(email).subscribe({
        next: (response) => {
            this.donor = response.donor; // Accede al objeto dentro de 'donor'
            console.log('Datos del donante:', this.donor);
        },
        error: (err) => {
            console.error('Error al obtener los datos del donante:', err);
        },
    });
    }
  }
  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    } else if (this.donor.image) {
      // Si ya hay una imagen cargada
      console.log('Imagen existente:', this.donor.image);
    }
  }
  

  updateDonor(): void {
    const updatedDonor = { ...this.donor };
    if (this.selectedImage) {
      updatedDonor.image = this.selectedImage;
    }

    this.apiService.updateDonor(this.donor.email, updatedDonor).subscribe({
      next: (res) => {
        console.log(res);
        alert('Donante actualizado con éxito');
        this.router.navigate(['/donors']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar el donante');
      },
    });
  }
}
