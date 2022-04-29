import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  //style: 0 -> normal, style: 1? -> error
  public showNotification(style: number, message: any): void {
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    if(style == 0) {config.panelClass= ["normal"];}
    else {config.panelClass= ["error"];}
    this.snackBar.open(message, 'X', config);
  }
}
