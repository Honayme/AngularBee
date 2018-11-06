///<reference path="core/home/home.component.ts"/>
///<reference path="trainings/pages/trainings-page/trainings.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeService} from './home.service';
import { ProfileComponent } from './profile/profile.component';
import { AppRouting } from './app.routing';
import { HomeComponent } from './core/home/home.component';
import { CertificationsComponent } from './certifications/pages/certifications-page/certifications.component';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { TrainingsComponent } from './trainings/pages/trainings-page/trainings.component';
import { ContactComponent } from './core/contact/contact.component';
import { CguComponent } from './core/cgu/cgu.component';
import { TeamComponent } from './core/team/team.component';
import { AddTrainingComponent } from './trainings/components/add-training/add-training.component';
import { AskTrainingComponent } from './trainings/components/ask-training/ask-training.component';
import { CertificationComponent } from './certifications/pages/certification-page/certification.component';
import { TrainingComponent } from './trainings/pages/training-page/training.component';
import {AuthService} from './auth/auth.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {TrainingService} from './trainings/training.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegisterComponent,
    CertificationsComponent,
    TrainingsComponent,
    TrainingComponent,
    ContactComponent,
    CguComponent,
    TeamComponent,
    ProfileComponent,
    AddTrainingComponent,
    AskTrainingComponent,
    CertificationComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRouting,
    MaterializeModule,
    ReactiveFormsModule,
  ],
  providers: [HomeService, AuthService, TrainingService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }
