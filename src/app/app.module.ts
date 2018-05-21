///<reference path="core/home/home.component.ts"/>
///<reference path="trainings/pages/trainings-page/trainings.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { HomeService} from "./home.service";
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./core/home/home.component";
import { CertificationsComponent } from "./certifications/pages/certifications-page/certifications.component";
import { LoginRegisterComponent } from "./auth/login-register/login-register.component";
import { TrainingsComponent } from "./trainings/pages/trainings-page/trainings.component";
import { ContactComponent } from "./core/contact/contact.component";
import { CguComponent } from "./core/cgu/cgu.component";
import { TeamComponent } from "./core/team/team.component";
import { AddTrainingComponent } from "./trainings/components/add-training/add-training.component";
import { AskTrainingComponent } from "./trainings/components/ask-training/ask-training.component";
import { CertificationComponent } from "./certifications/pages/certification-page/certification.component";
import { TrainingComponent } from "./trainings/pages/training-page/training.component";
import { SearchFiltersComponent } from "./certifications/components/search-filters/search-filters.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegisterComponent,
    CertificationsComponent,
    TrainingsComponent,
    ContactComponent,
    CguComponent,
    TeamComponent,
    ProfileComponent,
    AddTrainingComponent,
    AskTrainingComponent,
    TrainingComponent,
    CertificationComponent,
    SearchFiltersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [HomeService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }
