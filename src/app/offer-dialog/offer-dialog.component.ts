// offer-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-offer-dialog',
  templateUrl: './offer-dialog.component.html',
})
export class OfferDialogComponent {
  offer: any = {};

  constructor(
    public dialogRef: MatDialogRef<OfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.offer) {
      this.offer = { ...data.offer };
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.offer);
  }
}
