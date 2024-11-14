import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  titleAction$ = new BehaviorSubject<string>('Candidates');
  candidates: any[] = [];
  offers: any[] = [];
  selectedTab: string = 'candidates';

  constructor(
    private offreService: OffreService,
    private candidateService: CandidateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCandidates();
    this.fetchOffers();
  }

  fetchCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(
      (data) => this.candidates = data,
      (error) => console.error('Failed to retrieve candidates:', error)
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
}
