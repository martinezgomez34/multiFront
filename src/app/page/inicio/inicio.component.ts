import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableNewsComponent } from '../../table/table-news/table-news.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TableNewsComponent,
    MatTabsModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
