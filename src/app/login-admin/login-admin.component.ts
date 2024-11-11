import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
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
          this.jwtService.saveTokenAndRole(response.token, response.role);
          this.router.navigate(['/admin-dashboard']);
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
