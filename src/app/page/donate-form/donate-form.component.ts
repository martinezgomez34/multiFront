import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { StateService } from '../../service/state.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { PaypalButtonComponent } from '../../component/paypal-button/paypal-button.component';
import { Translate2Pipe } from '../../pipe/translate2.pipe';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ThanksyoumodalComponent } from '../../component/thanksyoumodal/thanksyoumodal.component';
import { ModalOthersComponent } from '../../component/modal-others/modal-others.component';
@Component({
  selector: 'app-donate-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, PaypalButtonComponent, Translate2Pipe],
  templateUrl: './donate-form.component.html',
  styleUrl: './donate-form.component.scss'
})
export class DonateFormComponent implements OnInit {
  @Input() isDarkMode!: boolean;
  userName: string | null = null;
  needType: string | null = null;
  centerData: any = null; // Datos del centro
  donorId: number | null = null; // ID del donante
  errorMessage: string | null = null;
  needIds: number[] = [];
  successMessage: string | null = null;
  showPaypalButton = false;
  selectedFileName: string | null = null;
  amountRequered: number | null = null;
  debounceTimer: any;

  donationData = {
    type: '',
    size: '',
    amount: 1,
    commentary: '',
    image: null as File | null
  };
  foodData = {
    type: '',
    amount: 0,
    commentary: '',
    expiryDate: '',
    image: null as File | null
  };
  moneyData = {
    amount: 0,
    commentary: '',
    image: null as File | null
  };  

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private apiService: ApiService, private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    // Obtener el parámetro user_name de la URL
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('user_name');
      this.needType = params.get('need_type');
      const amountString = params.get('amound_requered');
      this.amountRequered = amountString ? Number(amountString) : null;

      if (this.amountRequered !== null) {
      if (isNaN(this.amountRequered)) {
        console.error('El parámetro "amound_requered" no es un número válido:', amountString);
        this.amountRequered = null; 
      }
    }else{
      console.error("La cantidad requerida es nula");
      
    }
      if (this.userName) {
        this.fetchCenterData(this.userName);
        this.fetchNeedsData(this.userName, this.needType || '');
      }
    });
    this.donorId = this.stateService.getUserId();
      if (!this.donorId) {
      this.errorMessage = 'No se pudo obtener el ID del donante. Asegúrate de estar logeado.';
      }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.donationData.image = input.files[0];
      this.selectedFileName = input.files[0].name;
    }
  }
  onFileSelectedFood(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.foodData.image = input.files[0];
      this.selectedFileName = input.files[0].name;
    }
  }

  fetchCenterData(centerName: string): void {
    const apiUrl = 'http://127.0.0.1:8000';
    this.apiService.getCenterByName(centerName).subscribe({
      next: (response: any) => {
        this.centerData = response.center;
  
        // Concatenar la URL base con la imagen, si es necesario
        if (this.centerData.images && !this.centerData.images.startsWith('http')) {
          this.centerData.images = `${apiUrl}${this.centerData.images}`;
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del centro:', error);
        this.errorMessage = 'No se pudieron cargar los datos del centro.';
      },
    });
  }

  fetchNeedsData(userName: string, needType: string): void {
    this.apiService.getNeedsByUserNameAndType(userName, needType).subscribe({
      next: (response: any) => {
        // Extraer los IDs de las necesidades
        this.needIds = response.needs.map((need: any) => need.need_id);
        console.log('IDs de las necesidades:', this.needIds);
      },
      error: (error) => {
        console.error('Error al cargar las necesidades:', error);
        this.errorMessage = 'No se pudieron cargar las necesidades.';
      },
    });
  }
//formulario de ropa
  submitClothesDonation(): void {
    if (!this.donorId) {
      this.errorMessage = 'No se pudo obtener el ID del donante. Asegúrate de estar logeado.';
      return;
    }
  
    // Verificar si needIds está vacío
    if (!this.needIds.length) {
      this.errorMessage = 'No se pudieron obtener las necesidades. Intenta nuevamente.';
      return;
    }
  
    // Validar que el amount sea mayor o igual a 1
    if (this.donationData.amount < 1) {
      this.errorMessage = 'La cantidad debe ser al menos 1.';
      return;
    }
  
    const formData = new FormData();
    formData.append('type_donation', 'clothes'); // Tipo fijo
    formData.append('amount', this.donationData.amount.toString()); // Asegúrate de que amount sea un string
  
    // Concatenar tipo y talla en el comentario
    const fullCommentary = `${this.donationData.commentary || ''} Tipo: ${this.donationData.type}, Talla: ${this.donationData.size}`.trim();
    formData.append('comentary', fullCommentary);
  
    if (this.donationData.image) {
      formData.append('image', this.donationData.image);
    } else {
      this.errorMessage = 'Por favor, selecciona una imagen.';
      return;
    }
  
    // Tomar el primer ID de necesidad como ejemplo
    const needId = this.needIds[0];
  
    // Llamar al servicio y pasar donorId y needId en la URL
    this.apiService.registerDonation(this.donorId, needId, formData).subscribe({
      next: () => {
        this.successMessage = 'Donación registrada con éxito.';
        const dialogRef = this.openDialogOther(); 
        dialogRef.afterClosed().subscribe(() => {
          this.donationData = {
            amount: 0,
            commentary: '',
            type: '',
            size: '',
            image: null
          };
        this.needIds = [];
        this.router.navigate(['/Donate']);
        });
      },
      error: (error) => {
        console.error('Error al registrar la donación:', error);
        this.errorMessage = 'No se pudo registrar la donación.';
      }
    });
  }  

  //formulario para comidas
  submitFoodDonation(): void {
    if (!this.donorId) {
      this.errorMessage = 'No se pudo obtener el ID del donante. Asegúrate de estar logeado.';
      return;
    }

    // Verificar si needIds está vacío
    if (!this.needIds.length) {
      this.errorMessage = 'No se pudieron obtener las necesidades. Intenta nuevamente.';
      return;
    }

    // Validar que el amount sea mayor o igual a 1
    if (this.foodData.amount < 1) {
      this.errorMessage = 'La cantidad debe ser al menos 1.';
      return;
    }

    // Validar fecha de caducidad
  const currentDate = new Date();
  const expiryDate = new Date(this.foodData.expiryDate);

  // Verificar si la fecha de caducidad es anterior a hoy
  if (expiryDate < currentDate) {
    this.errorMessage = 'La fecha de caducidad no puede ser anterior a la fecha de hoy.';
    return;
  }

  // Verificar que la fecha de caducidad sea al menos 7 días después de hoy
  const minExpiryDate = new Date(currentDate.setDate(currentDate.getDate() + 6)); // Sumar 7 días a la fecha actual
  if (expiryDate < minExpiryDate) {
    this.errorMessage = 'La fecha de caducidad debe ser al menos 7 días después de la fecha actual.';
    return;
  }

    const formData = new FormData();
    formData.append('type_donation', 'food'); // Tipo fijo
    formData.append('amount', this.foodData.amount.toString()); // Asegúrate de que amount sea un string

    // Concatenar tipo y fecha de caducidad en el comentario
    const fullCommentary = `${this.foodData.commentary || ''} Tipo: ${this.foodData.type}, Fecha de caducidad: ${this.foodData.expiryDate}`.trim();
    formData.append('comentary', fullCommentary);

    if (this.foodData.image) {
      formData.append('image', this.foodData.image);
    } else {
      this.errorMessage = 'Por favor, selecciona una imagen.';
      return;
    }

    // Tomar el primer ID de necesidad como ejemplo
    const needId = this.needIds[0];

    // Llamar al servicio y pasar donorId y needId en la URL
    this.apiService.registerDonation(this.donorId, needId, formData).subscribe({
      next: () => {
        this.successMessage = 'Donación registrada con éxito.';
        console.log('Donación registrada correctamente.');
        const dialogRef = this.openDialogOther(); 
      dialogRef.afterClosed().subscribe(() => {
        this.moneyData = {
          amount: 0,
          commentary: '',
          image: null,
        };
        this.needIds = []; 
  
        // Redirigir a la ruta Donate
        this.router.navigate(['/Donate']);
      });
      },
      error: (error) => {
        console.error('Error al registrar la donación:', error);
        this.errorMessage = 'No se pudo registrar la donación.';
      }
    });
  }

//formulario de dinero
submitMoneyDonation(): void {
  if (!this.donorId) {
    this.errorMessage = 'No se pudo obtener el ID del donante. Asegúrate de estar logeado.';
    return;
  }

  // Verificar si needIds está vacío
  if (!this.needIds.length) {
    this.errorMessage = 'No se pudieron obtener las necesidades. Intenta nuevamente.';
    return;
  }

  // Validar que el amount sea mayor o igual a 1
  if (this.moneyData.amount < 1) {
    this.errorMessage = 'La cantidad a donar debe ser al menos 1.';
    return;
  }


  const formData = new FormData();
  formData.append('type_donation', 'money'); // Tipo fijo
  formData.append('amount', this.moneyData.amount.toString());

  if (this.moneyData.image) {
    formData.append('image', this.moneyData.image);
  } 
  // Agregar comentario si existe
  if (this.moneyData.commentary) {
    formData.append('comentary', this.moneyData.commentary.trim());
  }

  // Tomar el primer ID de necesidad como ejemplo
  const needId = this.needIds[0];

  // Llamar al servicio y pasar donorId y needId en la URL
  this.apiService.registerDonation(this.donorId, needId, formData).subscribe({
    next: () => {
      this.successMessage = 'Donación registrada con éxito.';
      console.log('Donación registrada correctamente.');
      const dialogRef = this.openDialogMoney(); // Suponiendo que openDialog() retorna el diálogo creado
      dialogRef.afterClosed().subscribe(() => {
        // Limpiar los campos de la donación después de la donación exitosa
        this.moneyData = {
          amount: 0,
          commentary: '',
          image: null,
        };
        this.needIds = []; // Limpiar las necesidades
  
        // Redirigir a la ruta Donate
        this.router.navigate(['/Donate']);
      });
    },
    error: (error) => {
      console.error('Error al registrar la donación:', error);
      this.errorMessage = 'No se pudo registrar la donación.';
    },
  });
}

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default-logo.png'; // Ruta de la imagen por defecto
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.moneyData.image = input.files[0];
      this.selectedFileName = input.files[0].name;
    } else{
      this.moneyData.image = null; // Opcional: Limpia el archivo si no hay selección
      this.selectedFileName = null;
    }
  }

  onPaymentCompleted(): void {
    this.submitMoneyDonation(); // Registrar la donación en tu API
  }
  
  onAmountEntered(): void {
    const enteredAmount = Number(this.moneyData.amount);
  
    // Verifica si `amountRequered` es válido
    if (this.amountRequered === null || this.amountRequered <= 0) {
      console.error("La cantidad requerida es nula o inválida");
      this.showPaypalButton = false;
      return;
    }
  
    // Validaciones sobre el monto ingresado
    if (enteredAmount > 0) {
      if (enteredAmount < this.amountRequered) {
        // Monto válido: menor al requerido
        console.log(`Monto válido: ${enteredAmount}. Mostrando botón después del delay.`);
        this.showPaypalButton = false; // Oculta temporalmente
        setTimeout(() => {
          this.showPaypalButton = true; // Muestra después de 2 segundos
        }, 2000);
      } else {
        this.errorMessage = `Monto ingresado (${enteredAmount}) excede la cantidad requerida (${this.amountRequered}).`;
        this.showPaypalButton = false;
      }
    } else {
      // Monto inválido: cero o negativo
      console.error("El monto ingresado es inválido");
      this.showPaypalButton = false;
    }
  }
  openDialogMoney(): MatDialogRef<ThanksyoumodalComponent> {
    return this.dialog.open(ThanksyoumodalComponent, {
      width: '400px',
      data: { message: this.successMessage, message2: this.centerData.contact.phone_number },
    });
  }
  openDialogOther(): MatDialogRef<ModalOthersComponent> {
    return this.dialog.open(ModalOthersComponent, {
      width: '400px',
      data: { message: this.centerData.address, message2 : this.centerData.contact.phone_number },
    });
  }  
}