import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importer le service Router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {} // Injecter le service Router

  candidat() {
    // Redirection vers la page de connexion candidat
    this.router.navigate(['/login']);
  }

  recruteur() {
    // Redirection vers la page de connexion recruteur
    this.router.navigate(['/login-recruteur']);
  }

  admin() {
    // Redirection vers la page de connexion admin
    this.router.navigate(['/login-admin']);
  }
}
