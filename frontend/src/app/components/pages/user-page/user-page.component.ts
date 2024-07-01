import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  constructor(private auth: AuthService) {}
  logout = () => {
    console.log('logging out...');
    this.auth.logout();
    window.location.reload();
  };
}
