import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  goHome() {
    // Rediriger vers la page d'accueil
    this.router.navigate(['/']); // Ajustez le chemin en fonction de votre route d'accueil
  } 
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Validate phone number with exactly 8 digits
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmerMotDePasse: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const motDePasse = form.get('motDePasse')?.value;
    const confirmerMotDePasse = form.get('confirmerMotDePasse')?.value;
    return motDePasse === confirmerMotDePasse ? null : { 'passwordMismatch': true };
  }

  submitForm(): void {
    console.log("Form Validity:", this.signupForm.valid);  // Log form validity for debugging

    if (this.signupForm.valid) {
      this.service.signup(this.signupForm.value).subscribe(
        (response) => {
          alert("Signup successful!");
        },
        (error) => {
          alert("Signup failed. Please try again.");
          console.error('Signup failed', error);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
