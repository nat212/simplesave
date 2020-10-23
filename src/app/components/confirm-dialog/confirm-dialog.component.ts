import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColour?: string;
  cancelColour?: string;
}

@Component({
  selector: 'ss-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  get confirmText(): string {
    return this.data.confirmText || 'Ok';
  }

  get cancelText(): string {
    return this.data.cancelText || 'Cancel';
  }

  get confirmColour(): string {
    return this.data.confirmColour ?? 'primary';
  }

  get cancelColour(): string {
    return this.data.cancelColour;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {}
}
