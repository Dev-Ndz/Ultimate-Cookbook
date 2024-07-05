import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  devMode: String = '';

  setEnvironmentType = () => {
    if (!environment.production) {
      this.devMode = 'DEV MODE';
    }
  };

  ngOnInit() {
    this.setEnvironmentType();
  }
}
