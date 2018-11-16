import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {ProfileComponent} from './profile/pages/profile.component';
import {TrainingsComponent} from './trainings/pages/trainings-page/trainings.component';
import {CguComponent} from './core/cgu/cgu.component';
import {TeamComponent} from './core/team/team.component';
import {ContactComponent} from './core/contact/contact.component';
import {CertificationsComponent} from './certifications/pages/certifications-page/certifications.component';
import {HomeComponent} from './core/home/home.component';
import {TrainingComponent} from './trainings/pages/training-page/training.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'formations', component: TrainingsComponent},
  {path: 'formations/detail/:id', component: TrainingComponent},
  {path: 'cgu', component: CguComponent},
  {path: 'team', component: TeamComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'certifications', component: CertificationsComponent},
  {path: 'profil', component: ProfileComponent},

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);

