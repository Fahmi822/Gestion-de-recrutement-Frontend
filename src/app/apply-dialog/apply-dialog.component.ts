import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DemandeService } from '../demande.service';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-apply-dialog',
  templateUrl: './apply-dialog.component.html',
  styleUrls: ['./apply-dialog.component.css'],
})
export class ApplyDialogComponent {
  isLoading = false;
  errorMessage: string | null = null;
  cvFile: File | null = null;
  lettreMotivationFile: File | null = null;
  diplomeFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ApplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private demandeService: DemandeService,
    private jwtService: JwtService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (!file) return;

    if (fileType === 'cv') {
      this.cvFile = file;
    } else if (fileType === 'lettreMotivation') {
      this.lettreMotivationFile = file;
    } else if (fileType === 'diplome') {
      this.diplomeFile = file;
    }
  }

  onSubmit(): void {
    if (!this.data.email || !this.cvFile || !this.lettreMotivationFile || !this.diplomeFile) {
      this.errorMessage = 'Veuillez remplir tous les champs et importer les fichiers.';
      return;
    }

    this.isLoading = false;
    this.errorMessage = null;

    const candidature = {
      candidatId: this.jwtService.getUtilisateurId(),
      offreId: this.data.offer.id,
      email: this.data.email,
      cv: this.cvFile,
      lettreMotivation: this.lettreMotivationFile,
      diplome: this.diplomeFile,
    };

    this.demandeService.postulerDemande(candidature).subscribe(
      (response) => {
        console.log('Candidature envoyée:', response);
        this.dialogRef.close({ success: true, message: 'Candidature envoyée avec succès.' });
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la candidature:', error);
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.';
      }
    );
  }
}
