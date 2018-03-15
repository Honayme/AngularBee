import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TrainingsComponent} from "./trainings/trainings.component";
import {CguComponent} from "./cgu/cgu.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";
import {CertificationsComponent} from "./certifications/certifications.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'formations', component: TrainingsComponent},
  {path: 'cgu', component: CguComponent},
  {path: 'team', component: TeamComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'certifications', component: CertificationsComponent},
  {path: 'profil', component: ProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
