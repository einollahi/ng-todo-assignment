import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getShowProgress(): Observable<boolean> {
    return this.showProgress.asObservable();
  }

  saveShowProgress(value: boolean): void {
    this.showProgress.next(value);
  }
}
