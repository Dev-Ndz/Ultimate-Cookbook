import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name:string=""
  email: string = '';
  password: string = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  register = (event: Event) => {
    this.authService.register(this.name, this.email, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  };
}

