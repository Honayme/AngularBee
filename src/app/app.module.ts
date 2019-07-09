///<reference path="core/home/home.component.ts"/>
///<reference path="trainings/pages/trainings-page/trainings.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeService } from './home.service';
import { ProfileComponent } from './profile/pages/profile.component';
import { AppRouting } from './app.routing';
//CORE
import { ContactComponent } from './core/contact/contact.component';
import { CguComponent } from './core/cgu/cgu.component';
import { TeamComponent } from './core/team/team.component';
import { HomeComponent } from './core/home/home.component';
//CERTIFICATIONS
import {CertificationService} from './certifications/certification.service';
import { CertificationComponent } from './certifications/pages/certification-page/certification.component';
import { CertificationsComponent } from './certifications/pages/certifications-page/certifications.component';
import {AddCertificationComponent} from './certifications/components/add-certification/add-certification.component';
//TRAINING
import { TrainingService } from './trainings/training.service';
import { TrainingComponent } from './trainings/pages/training-page/training.component';
import { AddTrainingComponent } from './trainings/components/add-training/add-training.component';
import { AskTrainingComponent } from './trainings/components/ask-training/ask-training.component';
import { TrainingsComponent } from './trainings/pages/trainings-page/trainings.component';
//AUTH
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
//SHARED
import { EqualValidatorDirective } from './shared/equal-validator.directive';
//PROFILE
import { BecomeTrainerComponent } from './profile/components/become-trainer/become-trainer.component';
import { UpdateCertificationComponent } from './certifications/components/update-certficiation/update-certification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CertificationsComponent,
    CertificationComponent,
    TrainingsComponent,
    TrainingComponent,
    ContactComponent,
    CguComponent,
    TeamComponent,
    ProfileComponent,
    AddTrainingComponent,
    AskTrainingComponent,
    LoginComponent,
    RegisterComponent,
    EqualValidatorDirective,
    BecomeTrainerComponent,
    AddCertificationComponent,
    UpdateCertificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRouting,
    MaterializeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [HomeService, AuthService, TrainingService, CertificationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }
