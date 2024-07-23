import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Recipe } from '../../../models/recipe';
import { DayComponent } from '../../day/day.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-planning',
  standalone: true,
  imports: [DialogModule, DayComponent, CommonModule],
  templateUrl: './add-to-planning.component.html',
  styleUrl: './add-to-planning.component.scss',
})
export class AddToPlanningComponent {
  visible: boolean = false;
  @Input() recipe!: Recipe;

  showDialog() {
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }
}
