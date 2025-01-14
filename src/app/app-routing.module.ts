import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardCandidatComponent } from './dashboard-candidat/dashboard-candidat.component';
import { HomeComponent } from './home/home.component';
import { LoginRecruteurComponent } from './login-recruteur/login-recruteur.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import{AdminDashboardComponent}from './admin-dashboard/admin-dashboard.component';
import { DashboardRecruteurComponent } from './dashboard-recruteur/dashboard-recruteur.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard-candidat', component: DashboardCandidatComponent },
  { path: 'recruteur-dashboard', component: DashboardRecruteurComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login-recruteur', component: LoginRecruteurComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
