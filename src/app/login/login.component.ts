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

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router
  ) {}
  goHome() {
    // Rediriger vers la page d'accueil
    this.router.navigate(['/']); // Ajustez le chemin en fonction de votre route d'accueil
  } 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }
  navigateToSignup(): void {
    this.router.navigate(['/signup']);  // Assuming your signup route is '/signup'
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.jwtService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful, JWT token:', response.token);
          localStorage.setItem('jwt', response.token);  
          // Enregistrer le token dans le stockage local
          this.router.navigate(['/dashboard-candidat']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }

} 

