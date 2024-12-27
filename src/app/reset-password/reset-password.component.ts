import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service'; // Assume this service handles the password reset

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup; // Utilisez "!" pour indiquer à TypeScript que la variable sera initialisée

  resetToken: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // Récupérer le token de réinitialisation depuis l'URL
    this.resetToken = this.route.snapshot.queryParamMap.get('resetToken');

    if (!this.resetToken) {
      // Gérer l'erreur si le token de réinitialisation n'est pas trouvé
      alert('Token invalide');
      this.router.navigate(['/home']);
    }

    // Initialiser le formulaire de réinitialisation du mot de passe
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.checkPasswords // Validation personnalisée pour vérifier que les mots de passe correspondent
    });
  }

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }
  onSubmit(): void {
    // Check if form is valid and reset token is present
    if (this.resetPasswordForm.valid && this.resetToken) {
      const password = this.resetPasswordForm.value.password;
  
      // Call the service to reset the password
      this.authService.resetPassword(this.resetToken, password).subscribe(
        response => {
          // Show success message using Toastr
          this.toastr.success('Mot de passe réinitialisé avec succès', 'Succès');
          // Navigate to the login page
          this.router.navigate(['/login']);
        },
        error => {
          // Show error message using Toastr
          const errorMessage = error?.error?.message || 'Erreur lors de la réinitialisation du mot de passe';
          this.toastr.error(errorMessage, 'Erreur');
        }
      );
    } else {
      // Show invalid form error using Toastr
      this.toastr.error('Formulaire invalide', 'Erreur');
    }
  }
}

