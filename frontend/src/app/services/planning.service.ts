import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Planning } from '../models/planning.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  planning?: Planning;
  constructor(private http: HttpClient) {}

  getPlanning() {
    console.log('USING SERVICE');
    this.http.get(environment.apiUrl + '/planning').subscribe({
      next: (response: any) => (this.planning = response),
      error: (err) => console.log(err),
    });
  }

  updatePlanning(planning: Planning) {
    return this.http.put(environment.apiUrl + '/planning', planning);
  }

  ngOnInit() {
    this.getPlanning();
  }
}
