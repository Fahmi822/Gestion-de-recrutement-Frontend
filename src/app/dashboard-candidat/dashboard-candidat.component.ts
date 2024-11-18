import { Component, OnInit } from '@angular/core';
import { OffreService } from '../offre.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-candidat',
  templateUrl: './dashboard-candidat.component.html',
  styleUrls: ['./dashboard-candidat.component.css']
})
export class DashboardCandidatComponent implements OnInit {
  offers: any[] = []; 
  appliedOffers: number[] = [];
  constructor(
    private offreService: OffreService,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {}
  application = {
    email: '',
    adresse: '',
    cv: null,
    lettreMotivation: '',
    diplome: ''
  };

  ngOnInit(): void {
    this.getOffers();
    
  }

  
  getOffers(): void {
    this.offreService.getAllOffers().subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres:', error);
        this.snackBar.open('Erreur de chargement des offres.', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  
  // Vérifier si l'offre est expirée
  isOfferExpired(expirationDate: string): boolean {
    const today = new Date();
    const expDate = new Date(expirationDate);
    return expDate < today;
  }

  
  isAlreadyApplied(offerId: number): boolean {
    return this.appliedOffers.includes(offerId);
  }

  
  applyForOffer(offerId: number): void {
    if (this.isAlreadyApplied(offerId)) {
      this.snackBar.open('Vous avez déjà postulé à cette offre.', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    
  }

  
  viewProfile(): void {
    console.log('Afficher le profil du candidat.');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  
  viewApplications(): void {
    console.log('Voir mes candidatures.');
    
  }
  
}
