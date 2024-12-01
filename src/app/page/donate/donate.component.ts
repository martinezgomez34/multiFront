import { Component, Input, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-donar',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent implements OnInit {
  @Input() isDarkMode!: boolean;
  ourEmail = "donate.me.infc@gmail.com";
  centers: any[] = [];
  donorId: number | null = null
  public noResults: boolean = false; // Bandera para mostrar/ocultar el mensaje de "no resultados"
  selectedType: string = 'comunityNeeds'; // Tipo seleccionado por defecto
  isFilterOpen: boolean = false; // Controla si el filtro está abierto
  selectedFilters: { [key: string]: string | boolean } = {}; // Filtros seleccionados
  errorMessage: string | null = null;

  constructor(private centersService: ApiService, private router: Router, private stateService: StateService) {}

  ngOnInit(): void {
    this.loadCenters();
    this.donorId = this.stateService.getUserId();
  }

  /**
   * Carga los centros según los filtros o el tipo seleccionado.
   */
  loadCenters(): void {
    const needType = this.selectedFilters['needType'] as string | undefined;
    const urgency = this.selectedFilters['urgency'] as boolean | undefined;

    // Si no hay filtros, se llama al servicio correspondiente sin parámetros
    if (!needType && urgency === undefined) {
      this.callServiceWithoutFilters();
    } else {
      // Si hay filtros, se llama al servicio correspondiente con parámetros
      this.callServiceWithFilters(needType || '', urgency === true);
    }
  }

  private callServiceWithoutFilters(): void {
    switch (this.selectedType) {
      case 'comunityNeeds':
        this.centersService.getComunityNeeds().subscribe({
          next: (data) => (this.centers = data.centers),
          error: (err) => console.error('Error al cargar los datos:', err),
        });
        break;
      case 'bankNeeds':
        this.centersService.getFoodBankNeeds().subscribe({
          next: (data) => (this.centers = data.centers),
          error: (err) => console.error('Error al cargar los datos:', err),
        });
        break;
      case 'sheltersNeeds':
        this.centersService.getSheltersNeeds().subscribe({
          next: (data) => (this.centers = data.centers),
          error: (err) => console.error('Error al cargar los datos:', err),
        });
        break;
    }
  }

  private callServiceWithFilters(needType: string, urgency: boolean): void {
    this.centers = []; // Reinicia la lista al hacer una nueva búsqueda
    this.noResults = false; // Oculta el mensaje de "no resultados" mientras se realiza la búsqueda
    
    switch (this.selectedType) {
      case 'comunityNeeds':
        this.centersService.getComunityNeedsWithFilters(needType, urgency).subscribe({
          next: (data) => {
            this.centers = data.centers;
            this.noResults = this.centers.length === 0; // Verifica si no hay resultados
          },
          error: (err) => {
            console.error('Error al cargar los datos:', err);
            this.noResults = true; // Muestra el mensaje de error
          },
        });
        break;
      case 'bankNeeds':
        this.centersService.getFoodBankNeedsWithFilters(needType, urgency).subscribe({
          next: (data) => {
            this.centers = data.centers;
            this.noResults = this.centers.length === 0;
          },
          error: (err) => {
            console.error('Error al cargar los datos:', err);
            this.noResults = true;
          },
        });
        break;
      case 'sheltersNeeds':
        this.centersService.getSheltersNeedsWithFilters(needType, urgency).subscribe({
          next: (data) => {
            this.centers = data.centers;
            this.noResults = this.centers.length === 0;
          },
          error: (err) => {
            console.error('Error al cargar los datos:', err);
            this.noResults = true;
          },
        });
        break;
    }
  }  


  selectType(type: string): void {
    this.selectedType = type;
    this.selectedFilters = {}; // Resetea los filtros al cambiar de tipo
    this.loadCenters();
  }


  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }


  updateFilter(filterKey: string, filterValue: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      // Si se marca, establece el filtro
      this.selectedFilters[filterKey] = filterValue;
    } else {
      // Si se desmarca, elimina el filtro
      delete this.selectedFilters[filterKey];
    }
  }

  applyFilters(): void {
    this.isFilterOpen = false; // Cierra el menú de filtros
    this.loadCenters();
    this.selectedFilters = {}
  }

  resetFilters(): void {
    this.selectedFilters = {}; // Limpia los filtros
    this.loadCenters(); // Recarga los datos sin filtros
    this.isFilterOpen = false
  }
  navigateToDonateForm(centerName: string, needType: string, amountRequered : string): void {
    if (!this.donorId) {
      this.errorMessage = "Debe iniciar secion antes de poder realizar una donacion.";
    }else{
      this.router.navigate([`Donate/DonateForm/${centerName}/${needType}/${amountRequered}`]);
    }
  }
}

