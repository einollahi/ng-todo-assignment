import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private uiService: UiService) { }

  get(url) {
    return new Observable<any>((observer: any) => {
      this.http.get(url)
        .pipe(catchError(this.handleError))
        .subscribe((res: any) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        })
    })
  }

  post(url, payload) {
    return new Observable<any>((observer: any) => {
      this.http.post(url, payload)
        .pipe(catchError(this.handleError))
        .subscribe((res: any) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        })
    })
  }

  // private _post(method, module, command, payload) {
  //   this.uiService.saveShowProgress(true)
  //   return new Observable<any>(observer => {
  //     this._http.post(this.API_URL, {method, module, command, payload})
  //       .pipe(catchError(this.handleError))
  //       .subscribe(res => {
  //         observer.next(res);
  //         observer.complete();
  //         this.uiService.saveShowProgress(false)
  //       }, err => {
  //         observer.error(err);
  //         observer.complete();
  //         this.uiService.saveShowProgress(false)
  //       })
  //   });
  // }

  private handleError(err) {
    return throwError(err);
  }
  
}
