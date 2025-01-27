import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService,
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
            this.jwtService.saveTokenAndRole(response.token,response.role );
            this.router.navigate(['/recruteur-dashboard']);
            this.toastr.success('login successful');
          },
        (error) => {
          this.toastr.error('Login failed:');
        }
      );
    }
  }
  goHome() {
    this.router.navigate(['/']);
  }
}
