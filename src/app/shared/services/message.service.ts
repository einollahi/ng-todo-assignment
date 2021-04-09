import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum MessageType {
  Success,
  Information,
  Warning,
  Error,
}

@Injectable({providedIn: 'root'})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  notify(msg: string, msgType: any) {
    const config: any = {direction: 'ltr'};
    switch (msgType) {
      case MessageType.Success: {
        config.duration = 3000;
        config.panelClass = 'alert-success';
      }
      break;
      case MessageType.Information: {
        config.duration = 3000;
        config.panelClass = 'alert-info';
      }
      break;
      case MessageType.Warning: {
        config.duration = 4000;
        config.panelClass = 'alert-warning';
      }
      break;
      case MessageType.Error: {
        config.duration = 5000;
        config.panelClass = 'alert-danger';
      }
      break;
    }

    this.snackBar.open(msg, null, config);
  }
}
