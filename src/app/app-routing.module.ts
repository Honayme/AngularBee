import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {TrainingsComponent} from "./trainings/pages/trainings-page/trainings.component";
import {CguComponent} from "./core/cgu/cgu.component";
import {TeamComponent} from "./core/team/team.component";
import {ContactComponent} from "./core/contact/contact.component";
import {CertificationsComponent} from "./certifications/pages/certifications-page/certifications.component";
import {HomeComponent} from "./core/home/home.component";

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
