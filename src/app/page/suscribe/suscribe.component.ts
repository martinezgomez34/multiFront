import { Component, Input } from '@angular/core';
import { PaypalButtonComponent } from '../../component/paypal-button/paypal-button.component';
import { StateService } from '../../service/state.service';
import { ApiService } from '../../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SuscriberDialogComponent } from '../../component/suscriber-dialog/suscriber-dialog.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-suscribe',
  standalone: true,
  imports: [PaypalButtonComponent, CommonModule],
  templateUrl: './suscribe.component.html',
  styleUrl: './suscribe.component.scss'
})
export class SuscribeComponent {
  @Input() isDarkMode!: boolean;
  constructor(private id : StateService, private api : ApiService, private dialog : MatDialog){}
  async onPaymentCompleted(): Promise<void> {
    try {
      const email = await this.getEmail(); 
      console.log('Email obtenido:', email);
      this.putEmail(email);
    } catch (error) {
      console.error('Error en onPaymentCompleted:', error);
    }
  }
  
  getEmail(): Promise<string> {
    const user_id = this.id.getUserId();
    return new Promise((resolve, reject) => {
      this.api.getUserId(user_id).subscribe(
        (response: any) => {
          const email = String(response.user.email);
          console.log('Email del usuario:', email);
          resolve(email); 
        },
        (error) => {
          console.error('Error obteniendo el email:', error);
          reject(error);
        }
      );
    });
  }  
  putEmail(email: string): void {
    this.api.putSponsor(email).subscribe(
      (response: any) => {
        this.openThankYouDialog()
      },
      (error) => {
        console.error('Error al actualizar el estado de patrocinador:', error); // Maneja errores
      }
    );
  }
  
  openThankYouDialog(): void {
    const dialogRef = this.dialog.open(SuscriberDialogComponent);
  }  
}
