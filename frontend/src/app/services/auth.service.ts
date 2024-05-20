import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
     
  constructor(private http: HttpClient) {
  }
    
  login(email:string, password:string ) {
      return this.http.post<User>('/api/login', {email, password}).shareReplay();
          // this is just the HTTP call, 
          // we still need to handle the reception of the token
          
  }
}