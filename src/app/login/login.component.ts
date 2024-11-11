import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

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
    private router: Router
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
          } else {
            this.errorMessage = 'Access denied: Only candidates can log in here.';
          }
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
