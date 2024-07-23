import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Recipe } from '../../../models/recipe';
import { DayComponent } from '../../day/day.component';
import { CommonModule } from '@angular/common';
import { PlanningService } from '../../../services/planning.service';
import { Planning } from '../../../models/planning.interface';

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

  planning: Planning = {
    _id: '',
    days: [],
  };
  constructor(private planningService: PlanningService) {}

  showDialog() {
    this.getPlanning();
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }

  validate() {
    this.updatePlanning();
    this.closeDialog();
  }

  getPlanning() {
    this.planningService.getPlanning().subscribe({
      next: (response: any) => {
        this.planning = response;
        console.log(response);
      },
      error: (err) => console.log(err),
    });
  }

  updatePlanning() {
    if (this.planning) {
      this.planningService.updatePlanning(this.planning).subscribe({
        next: (response: any) => (this.planning = response.updatedPlanning),
        error: (err) => console.log(err),
      });
    }
  }

  addToDay(index: number) {
    this.planning.days[index].recipes?.push(this.recipe);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
