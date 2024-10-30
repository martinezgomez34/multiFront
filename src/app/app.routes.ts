import { Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { CentroComponent } from './page/centro/centro.component';
import { DonarComponent } from './page/donar/donar.component';
import { RankingComponent } from './page/ranking/ranking.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'Centros',
        component: CentroComponent
    },
    {
        path: 'Donaciones',
        component: DonarComponent
    },
    {
        path: 'Ranking',
        component: RankingComponent
    },
    
    
];
