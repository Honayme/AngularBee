import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { HomeService} from "./home.service";
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { ContactComponent } from './contact/contact.component';
import { CguComponent } from './cgu/cgu.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { AddTrainingComponent} from "./trainings/add-training/add-training.component";
import { AppRoutingModule} from "./app-routing.module";
import { AskTrainingComponent } from './trainings/ask-training/ask-training.component';
import { TrainingComponent } from './trainings/training/training.component';
import { CertificationComponent } from './certifications/certification/certification.component';
import { SearchFiltersComponent } from './certifications/search-filters/search-filters.component';


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
