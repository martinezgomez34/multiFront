import { Component, Input, HostBinding} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableNewsComponent } from '../../component/table/table-news/table-news.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TableNewsComponent,
    MatTabsModule,
    CommonModule,

],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @Input() isDarkMode!: boolean;

}
