import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  isLoading: boolean = false;
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(
      (loading: boolean) => {
        this.isLoading = loading;
      }
    );
  }
}
