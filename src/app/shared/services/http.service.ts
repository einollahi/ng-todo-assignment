import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UiService } from './ui.service';
import { MessageService, MessageType } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private uiService: UiService, private messageService: MessageService) { }

  get(url) {
    this.uiService.saveIsloading(true);
    return new Observable<any>((observer: any) => {
      this.http.get(url)
        .pipe(catchError(this.handleError))
        .subscribe((res: any) => {
          observer.next(res);
          this.uiService.saveIsloading(false);
          observer.complete();
        }, err => {
          this.messageService.notify(err['error'], MessageType.Error);
          observer.error(err);
          this.uiService.saveIsloading(false);
          observer.complete();
        })
    })
  }

  post(url, payload) {
    this.uiService.saveIsloading(true);
    return new Observable<any>((observer: any) => {
      this.http.post(url, payload)
        .pipe(catchError(this.handleError))
        .subscribe((res: any) => {
          observer.next(res);
          this.uiService.saveIsloading(false);
          observer.complete();
        }, err => {
          observer.error(err);
          this.uiService.saveIsloading(false);
          observer.complete();
        })
    })
  }

  private handleError(err) {
    return throwError(err);
  }
  
}
