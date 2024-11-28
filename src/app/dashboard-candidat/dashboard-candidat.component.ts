import { Component, OnInit } from '@angular/core';
import { OffreService } from '../offre.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplyDialogComponent } from '../apply-dialog/apply-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DemandeService } from '../demande.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { JwtService } from '../jwt.service';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-dashboard-candidat',
  templateUrl: './dashboard-candidat.component.html',
  styleUrls: ['./dashboard-candidat.component.css']
})
export class DashboardCandidatComponent implements OnInit {
  photoUrl: string = 'assets/icon.png'; 
  candidat: any = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    genre: '',
    tel: '',
    adresse: '',
    photo: '',
  };
  titleAction$ = new BehaviorSubject<string>('offers');
  selectedTab: string = 'offers';
  offers: any[] = [];
  appliedOffers: number[] = [];
  candidatName: string = '';
  utilisateurId: number | null = null;

  constructor(
    private offreService: OffreService,
    private snackBar: MatSnackBar,
    private demandeService: DemandeService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private jwtService: JwtService,
    private candidateService: CandidateService,
  ) {}

  ngOnInit(): void {
    this.utilisateurId = this.jwtService.getUtilisateurId(); // Retrieve user ID from JWT
    if (this.utilisateurId) {
      this.candidateService.getCandidatById(this.utilisateurId).subscribe(
        (candidat) => {
          this.candidat = candidat; // Populate candidat object with retrieved data
          this.candidatName = candidat.nom;
          this.photoUrl = candidat.photo || 'assets/icon.png';
        },
        (error) => {
          console.error('Erreur lors de la récupération du candidat:', error);
          this.candidatName = 'Utilisateur';
        }
      );
    }

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

  openApplyDialog(offer: any): void {
    const dialogRef = this.dialog.open(ApplyDialogComponent, {
      width: '400px',
      data: { offer, candidatId: this.authService.getCandidatId() }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open(result.message, 'Fermer', {
          duration: 3000,
        });
      }
    });
  }

  isOfferExpired(expirationDate: string): boolean {
    const today = new Date();
    const expDate = new Date(expirationDate);
    return expDate < today;
  }

  isAlreadyApplied(offerId: number): boolean {
    return this.appliedOffers.includes(offerId);
  }

  viewProfile(): void {
    console.log('Afficher le profil du candidat.');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  changeTitle(newTitle: string, tab: string): void {
    this.titleAction$.next(newTitle);
    this.selectedTab = tab;
  }

  // Handle photo change
  onPhotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const img = new Image();
      
      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          // Resize image here if necessary (e.g., canvas)
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const MAX_WIDTH = 800; // Max width for resizing
            const MAX_HEIGHT = 800; // Max height for resizing
            let width = img.width;
            let height = img.height;
            
            // Calculate new dimensions to maintain aspect ratio
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
  
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            // Get the resized image as base64
            this.candidat.photo = canvas.toDataURL('image/jpeg');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Update the candidate's profile
  onUpdateProfil(): void {
    const utilisateurId = this.jwtService.getUtilisateurId(); // Get the user ID from JWT
    if (!utilisateurId) {
      alert('Utilisateur non trouvé. Veuillez vous reconnecter.');
      return;
    }
    
    // Call the service to update the candidate profile
    this.candidateService.updateCandidat(utilisateurId, this.candidat).subscribe(
      (response) => {
        alert('Profil mis à jour avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }
}
