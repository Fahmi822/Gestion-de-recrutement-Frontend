import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande.service';
import { Demande } from '../models/Demande';
import { DemandeWithEntretien } from '../models/DemandeWithEntretien';
import { OffreService } from '../offre.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-recruteur',
  templateUrl: './dashboard-recruteur.component.html',
  styleUrls: ['./dashboard-recruteur.component.css']
})
export class DashboardRecruteurComponent implements OnInit {
  offers: any[] = []; 
  selectedOffreId: number | null = null;
  demandes: Demande[] = [];
  titleAction$ = new BehaviorSubject<string>('offers');
  selectedTab: string = 'offers';
  baseUrl: string = 'http://localhost:8085/api/demandes';
  demandee: DemandeWithEntretien[] = []; 
  constructor(
    private offreService: OffreService,
    private demandeService: DemandeService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getOffers(); // Load all offers on component initialization
    this.fetchDemandes(); 
  }

  // Fetch all job offers
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
  getDemandesByOffre(offreId: number): void {
    this.selectedOffreId = offreId;
    this.selectedTab = 'demandes';
    
    this.demandeService.getDemandesByOffre(offreId).subscribe(
      (demandes) => {
        console.log('Demandes reçues:', demandes); // Vérifier les données reçues
        this.demandes = demandes.map(demande => ({
          ...demande,
          cvUrl: this.getFileUrl(demande.cv), // Assurez-vous que le champ cv existe
          diplomeUrl: this.getFileUrl(demande.diplome), // Assurez-vous que le champ diplome existe
          lettreMotivationUrl: this.getFileUrl(demande.lettreMotivation) // Assurez-vous que le champ lettreMotivation existe
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
        this.snackBar.open('Erreur de chargement des demandes.', 'Fermer', { duration: 3000 });
      }
    );
  }
  
  private getFileUrl(fileName: string | undefined): string {
    return fileName ? `http://localhost:8085/api/demandes/fichiers/${fileName}` : '';
  }
  
  
  
  // Method to accept a demande
  acceptDemande(demandeId: number): void {
    this.demandeService.acceptDemande(demandeId).subscribe(
      (data) => {
        // Affichage d'un message de succès
        this.snackBar.open('Demande acceptée avec succès. L\'entretien est fixé une semaine après l\'acceptation.', 'Fermer', { duration: 3000 });
  
        // Rafraîchir la liste des demandes après acceptation
        this.getDemandesByOffre(this.selectedOffreId!);
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de la demande:', error);
  
        // Affichage d'un message d'erreur
        const errorMessage = error.error || 'Erreur lors de l\'acceptation de la demande. Veuillez réessayer.';
        this.snackBar.open(errorMessage, 'Fermer', { duration: 3000 });
      }
    );
  }
  refuserDemande(demandeId: number): void {
    this.demandeService.refuserDemande(demandeId).subscribe(
      (data) => {
        // Affichage d'un message de succès
        this.snackBar.open('Demande refusée avec succès.', 'Fermer', { duration: 3000 });
  
        // Rafraîchir la liste des demandes après le refus
        this.getDemandesByOffre(this.selectedOffreId!);
      },
      (error) => {
        console.error('Erreur lors du refus de la demande:', error);
  
        
        const errorMessage = error.error || 'Erreur lors du refus de la demande. Veuillez réessayer.';
        this.snackBar.open(errorMessage, 'Fermer', { duration: 3000 });
      }
    );
  }
  changeTitle(newTitle: string, tab: string): void {
    this.titleAction$.next(newTitle);
    this.selectedTab = tab;
  }

  
  logout() {
    // Supprimer le token d'authentification
    localStorage.removeItem('authToken');
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
  fetchDemandes(): void {
    this.demandeService.getAcceptedDemandesWithEntretiens()
      .subscribe(demandee => {
        this.demandee = demandee;
      });
  }
}
