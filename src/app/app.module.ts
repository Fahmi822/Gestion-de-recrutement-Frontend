import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardCandidatComponent } from './dashboard-candidat/dashboard-candidat.component';
import { HomeComponent } from './home/home.component';
import { LoginRecruteurComponent } from './login-recruteur/login-recruteur.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { OfferDialogComponent } from './offer-dialog/offer-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplyDialogComponent } from './apply-dialog/apply-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardRecruteurComponent } from './dashboard-recruteur/dashboard-recruteur.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardCandidatComponent,
    HomeComponent,
    LoginRecruteurComponent,
    LoginAdminComponent,
    AdminDashboardComponent,
    OfferDialogComponent,
    ApplyDialogComponent,
    DashboardRecruteurComponent,
    ForgotPasswordModalComponent,
    ResetPasswordComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
