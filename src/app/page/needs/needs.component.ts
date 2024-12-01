import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-needs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './needs.component.html',
  styleUrl: './needs.component.scss'
})
export class NeedsComponent implements OnInit{
  needs: any[] = [];
  needForm: FormGroup;
  updateMode: boolean = false;
  selectedNeedId: number | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.needForm = this.fb.group({
      type_need: ['', Validators.required],
      amount_required: ['', Validators.required],
      urgency: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadNeeds();
  }

  loadNeeds(): void {
    this.apiService.getAllNeeds().subscribe(
      (data) => {
        this.needs = data.needs;
      },
      (error) => {
        console.error('Error al cargar las necesidades', error);
      }
    );
  }

  onSubmit(): void {
    if (this.needForm.invalid) {
      return;
    }

    const needData = this.needForm.value;
    if (this.updateMode && this.selectedNeedId !== null) {
      this.apiService.updateNeed(this.selectedNeedId, needData).subscribe(
        (response) => {
          this.loadNeeds();
          this.resetForm();
        },
        (error) => {
          console.error('Error al actualizar la necesidad', error);
        }
      );
    } else {
      const center_fk = 13; // Reemplaza con el ID de tu centro
      this.apiService.registerNeed(needData, center_fk).subscribe(
        (response) => {
          this.loadNeeds();
          this.resetForm();
        },
        (error) => {
          console.error('Error al registrar la necesidad', error);
        }
      );
    }
  }

  editNeed(need: any): void {
    this.needForm.patchValue({
      type_need: need.type_need,
      amount_required: need.amount_required,
      urgency: need.urgency
    });
    this.updateMode = true;
    this.selectedNeedId = need.id;
  }

  deleteNeed(need_id: number): void {
    this.apiService.deleteNeed(need_id).subscribe(
      (response) => {
        this.loadNeeds();
      },
      (error) => {
        console.error('Error al eliminar la necesidad', error);
      }
    );
  }

  resetForm(): void {
    this.needForm.reset();
    this.updateMode = false;
    this.selectedNeedId = null;
  }
}
