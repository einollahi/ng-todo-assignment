import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private isloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  getIsloading(): Observable<boolean> {
    return this.isloading.asObservable();
  }

  saveIsloading(value: boolean): void {
    this.isloading.next(value);
  }
}
