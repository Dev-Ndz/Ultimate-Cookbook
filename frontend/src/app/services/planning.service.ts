import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Planning } from '../models/planning.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  // private planning: BehaviorSubject<Planning> = new BehaviorSubject<Planning>({
  //   _id: '',
  //   days: [],
  // });
  constructor(private http: HttpClient) {}

  // getPlanning() {
  //   console.log('USING SERVICE');
  //   this.http.get(environment.apiUrl + '/planning').subscribe({
  //     next: (response: any) => (this.planning = response),
  //     error: (err) => console.log(err),
  //   });
  // }

  getPlanning() {
    return this.http.get(environment.apiUrl + '/planning');
  }


  updatePlanning(planning: Planning) {
    return this.http.put(environment.apiUrl + '/planning', planning);
  }

  ngOnInit() {
    this.getPlanning();
  }
}
