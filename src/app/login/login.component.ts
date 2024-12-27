import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component'; // Import modal


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.jwtService.login(this.loginForm.value).subscribe(
        (response) => {
          const role = response.role; // Get the role from the response

          if (role === 'Candidat') { // Adjusting to match your case sensitivity
            this.jwtService.saveTokenAndRole(response.token, role);
            this.router.navigate(['/dashboard-candidat']);
            this.toastr.success('login successful');
            
          } else {
            this.errorMessage = 'Access denied: Only candidates can log in here.';
          }
        },
        (error) => {
          this.toastr.error('Login failed:');
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    }
  }

  openForgotPasswordModal(): void {
    this.dialog.open(ForgotPasswordModalComponent);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
