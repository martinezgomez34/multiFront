import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-others',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-others.component.html',
  styleUrl: './modal-others.component.scss'
})
export class ModalOthersComponent {
  @Input() isDarkMode!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, message2: string },
    private dialogRef: MatDialogRef<ModalOthersComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }
}