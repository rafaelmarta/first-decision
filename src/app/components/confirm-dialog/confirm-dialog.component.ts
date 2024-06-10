import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <div class="dialog-container">
    <h2>Deseja sair sem Salvar?</h2>
    <mat-dialog-actions class="actions">
      <button mat-button class="action-close" (click)="onDismiss()">Não</button>
      <button mat-button class="action-confirm" cdkFocusInitial (click)="onConfirm()">Sim</button>
    </mat-dialog-actions>

  </div>
  `,
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<ConfirmDialogComponent>
  ){}

  onConfirm(): void {
    this._dialogRef.close(true);
  }

  onDismiss(): void {
    this._dialogRef.close(false);
  }
}
