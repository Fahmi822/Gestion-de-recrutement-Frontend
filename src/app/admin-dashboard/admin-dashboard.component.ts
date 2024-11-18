import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OffreService } from '../offre.service';
import { CandidateService } from '../candidate.service';
import { OfferDialogComponent } from '../offer-dialog/offer-dialog.component';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  titleAction$ = new BehaviorSubject<string>('Analyse');
  candidates: any[] = [];
  offers: any[] = [];
  selectedTab: string = 'Analyse';
  totalCandidates: number = 0;
  numberOfMen: number = 0;
  numberOfWomen: number = 0;
  totalOffres: number = 0;

  constructor(
    private offreService: OffreService,
    private candidateService: CandidateService,
    private dialog: MatDialog,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.fetchCandidates();
    this.fetchOffers();
    this.getTotalCandidates();
    this.getNumberOfMen();
    this.getNumberOfWomen();
    this.getTotalOffres();
  }
  

  fetchCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(
      (data) => this.candidates = data,
      (error) => console.error('Failed to retrieve candidates:', error)
    );
  }
  getTotalCandidates(): void {
    this.candidateService.getTotalCandidates().subscribe(
      (data) => {
        this.totalCandidates = data;
      },
      (error) => {
        console.error('Error fetching total candidates:', error);
      }
    );
  }
  getTotalOffres(): void {
    this.offreService.getTotalOffre().subscribe(
      (data) => {
        this.totalOffres= data;
      },
      (error) => {
        console.error('Error fetching total offers:', error);
      }
    );
  }


  getNumberOfMen(): void {
    this.candidateService.getNumberOfMen().subscribe(
      (data) => {
        this.numberOfMen = data;
      },
      (error) => {
        console.error('Error fetching number of men:', error);
      }
    );
  }

  getNumberOfWomen(): void {
    this.candidateService.getNumberOfWomen().subscribe(
      (data) => {
        this.numberOfWomen = data;
      },
      (error) => {
        console.error('Error fetching number of women:', error);
      }
    );
  }

  fetchOffers(): void {
    this.offreService.getAllOffers().subscribe(
      (data) => this.offers = data,
      (error) => console.error('Failed to retrieve offers:', error)
    );
  }

  addOffer(): void {
    const dialogRef = this.dialog.open(OfferDialogComponent, {
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offreService.addOffer(result).subscribe(
          () => this.fetchOffers(),
          (error) => console.error('Failed to add offer:', error)
        );
      }
    });
  }

  editOffer(offer: any): void {
    const dialogRef = this.dialog.open(OfferDialogComponent, {
      data: { offer, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offreService.updateOffer(offer.id, result).subscribe(
          () => this.fetchOffers(),
          (error) => console.error('Failed to update offer:', error)
        );
      }
    });
  }

  deleteOffer(id: number): void {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offreService.deleteOffer(id).subscribe(
        () => this.fetchOffers(),
        (error) => console.error('Failed to delete offer:', error)
      );
    }
  }
  

  changeTitle(newTitle: string, tab: string): void {
    this.titleAction$.next(newTitle);
    this.selectedTab = tab;
  }
  viewProfile() {
    // Naviguer vers la page de profil
    this.router.navigate(['/profile']);
  }

  logout() {
    // Supprimer le token d'authentification
    localStorage.removeItem('authToken');
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
  dropdownOpen = false;

 
}
