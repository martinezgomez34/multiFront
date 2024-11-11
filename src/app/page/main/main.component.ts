import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableNewsComponent } from '../../component/table/table-news/table-news.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TableNewsComponent,
    MatTabsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
