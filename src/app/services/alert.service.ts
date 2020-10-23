import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '@components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  public openDialog<T = any>(
    component: ComponentType<any>,
    config: MatDialogConfig = {},
  ): Observable<T> {
    return this.dialog
      .open(component, { maxWidth: '280px', ...config })
      .afterClosed() as Observable<T>;
  }

  public confirm(
    title: string,
    message: string,
    { cancelText, cancelColour, confirmText, confirmColour }: Partial<ConfirmDialogData> = {},
    config: MatDialogConfig = {},
  ): Observable<boolean> {
    const data: ConfirmDialogData = {
      title,
      message,
      cancelText,
      cancelColour,
      confirmText,
      confirmColour,
    };
    return this.openDialog<boolean>(ConfirmDialogComponent, { data, ...config });
  }
}
