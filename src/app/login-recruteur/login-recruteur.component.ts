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
  goHome() {
    // Rediriger vers la page d'accueil
    this.router.navigate(['/']); // Ajustez le chemin en fonction de votre route d'accueil
  } 

  submitForm(): void {
    if (this.loginForm.valid) {
      this.jwtService.login(this.loginForm.value).subscribe(
        (response) => {
          localStorage.setItem('jwt', response.token);
          this.router.navigate(['/recruteur-dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
