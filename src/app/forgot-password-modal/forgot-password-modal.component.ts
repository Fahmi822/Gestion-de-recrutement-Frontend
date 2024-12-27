import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Function called when the form is submitted
  submitForm(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;

      // Call forgotPassword service to send email
      this.authService.forgotPassword({ email }).subscribe(
        (response) => {
          // On success, show the success message and close the dialog
          this.toastr.success('Password reset link has been sent to your email.');
          this.dialogRef.close();
        },
        (error) => {
          // Show an error message if there is an issue
          this.toastr.error('Error: Unable to send reset link.');
        }
      );
    }
  }

  // Close the dialog without performing any action
  onNoClick(): void {
    this.dialogRef.close();
  }
}
