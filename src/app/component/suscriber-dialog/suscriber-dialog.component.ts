import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { StateService } from '../../service/state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-suscriber-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suscriber-dialog.component.html',
  styleUrl: './suscriber-dialog.component.scss'
})
export class SuscriberDialogComponent {
  @Input() isDarkMode!: boolean;
  constructor(private dialogRef: MatDialogRef<SuscriberDialogComponent>, private logout: StateService, private router : Router){}
  closeDialog(): void {
    this.dialogRef.close();
    this.logout.logout()
    this.router.navigate(['Login'])
  }
}
