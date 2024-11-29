import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-thanksyoumodal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thanksyoumodal.component.html',
  styleUrl: './thanksyoumodal.component.scss'
})
export class ThanksyoumodalComponent {
  @Input() isDarkMode!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, message2: string },
    private dialogRef: MatDialogRef<ThanksyoumodalComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }
}