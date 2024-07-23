import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }


  // public loading: boolean = false;
  // show() {
  //   console.log('start loading');
  //   this.loading = true;
  // }

  // hide() {
  //   console.log('finish loading');
  //   this.loading = false;
  // }
}
