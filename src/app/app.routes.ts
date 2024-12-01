import { Routes } from '@angular/router';
import { CenterComponent } from './page/center/center.component';
import { RankingComponent } from './page/ranking/ranking.component';
import { MainComponent } from './page/main/main.component';
import { DonateComponent } from './page/donate/donate.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { DonateFormComponent } from './page/donate-form/donate-form.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RegisterCenComponent } from './page/register-cen/register-cen.component';
import { VerifyemailComponent } from './page/verifyemail/verifyemail.component';

import { NeedsComponent } from './page/needs/needs.component';
import { NewsComponent } from './page/news/news.component';

import { EditDonorComponent } from './page/edit-donor/edit-donor.component';

import { SuscribeComponent } from './page/suscribe/suscribe.component';
import { MyDonationComponent } from './page/my-donation/my-donation.component';

import { SpecialNewsComponent } from './page/special-news/special-news.component';
import { UpdateNewsComponent } from './page/update-news/update-news.component';
import { DeleteNewsComponent } from './page/delete-news/delete-news.component';
import { CreateNewsComponent } from './page/create-news/create-news.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'Center',
        component: CenterComponent
    },
    {
        path: 'Donate',
        component: DonateComponent
    },
    {
        path: 'Ranking',
        component: RankingComponent
    },
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'Login/Register',
        component: RegisterComponent
    },
    {
        path: 'Donate/DonateForm/:user_name/:need_type/:amound_requered',
        component: DonateFormComponent
    },
    {
        path: 'rescenter',
        component: RegisterCenComponent
    },
    {
        path: 'verify_email',
        component:VerifyemailComponent
    },
    {
        path: 'Needs',
        component:NeedsComponent
    },
    {
        path: 'NewsCenter',
        component:NewsComponent
    },
    {
        path: 'edit-donor',
        component:EditDonorComponent
    },
    {
        path: 'suscribtion',
        component:SuscribeComponent
    },
    {
        path: 'mydonations',
        component:MyDonationComponent
    },
    {
        path: 'SpecialNews',
        component:SpecialNewsComponent
    },
    {
        path: 'UpdateNews',
        component:UpdateNewsComponent
    },
    {
        path: 'NewsCenter/DeleteNews',
        component:DeleteNewsComponent
    },
    {
        path: 'CreateNews',
        component:CreateNewsComponent
    },
];
