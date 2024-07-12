import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout = () => {
    console.log('logging out...');
    this.auth.logout();
    this.router.navigate(['']);
  };
}
