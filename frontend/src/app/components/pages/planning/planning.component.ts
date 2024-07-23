import { Component } from '@angular/core';
import { PlanningService } from '../../../services/planning.service';
import { Planning } from '../../../models/planning.interface';
import { CommonModule } from '@angular/common';
import { DayComponent } from '../../day/day.component';
import { MealComponent } from '../../meal/meal.component';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, DayComponent, MealComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss',
})
export class PlanningComponent {
  planning: Planning = {
    _id: '',
    days: [],
  };
  constructor(private planningService: PlanningService) {}

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

  saveName(updatedName: string, index: number) {
    this.planning.days[index].name = updatedName;
    this.updatePlanning();
  }

  removeRecipe(indexDay: number, indexMeal: number) {
    this.planning.days[indexDay].meals?.splice(indexMeal, 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  ngOnInit() {
    this.getPlanning();
  }
}
