import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Planning } from '../models/planning.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  constructor(private http: HttpClient) {}

  getPlanning() {
    return this.http.get(environment.apiUrl + '/planning');
  }

  updatePlanning(planning: Planning) {
    return this.http.put(environment.apiUrl + '/planning', planning);
  }
}
