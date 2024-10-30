import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogLogComponent } from '../dialog/dialog-log/dialog-log.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    DialogLogComponent,
    MatIconModule
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {} // Inyecta MatDialog en lugar de DialogLogComponent

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(DialogLogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Login data:', result);
      }
    });
  }
}