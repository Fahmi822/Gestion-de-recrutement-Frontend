import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-recruteur',
  templateUrl: './login-recruteur.component.html',
  styleUrls: ['./login-recruteur.component.css']
})
export class LoginRecruteurComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router
  ) {
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

          if (role === 'Recruteur') { // Ensure this matches the expected role
            this.jwtService.saveTokenAndRole(response.token, role);
            this.router.navigate(['/recruteur-dashboard']);
          } else {
            console.error('Access denied: This login is for recruiters only.');
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
