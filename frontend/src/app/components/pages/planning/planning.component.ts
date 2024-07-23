import { Component } from '@angular/core';
import { PlanningService } from '../../../services/planning.service';
import { Planning } from '../../../models/planning.interface';
import { CommonModule } from '@angular/common';
import { DayComponent } from '../../day/day.component';
import { RouterLink } from '@angular/router';
import { AddToListComponent } from '../../buttons/add-to-list/add-to-list.component';
import { Ingredient } from '../../../models/ingredient.interface';
import { Day } from '../../../models/day.interface';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, DayComponent, RouterLink, AddToListComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss',
})
export class PlanningComponent {
  planning: Planning = {
    _id: '',
    days: [],
  };
  list: Ingredient[] = [];
  constructor(private planningService: PlanningService) {}

  getPlanning() {
    this.planningService.getPlanning().subscribe({
      next: (response: any) => {
        this.planning = response;
        this.updateList();
      },
      error: (err) => console.log(err),
    });
  }

  updatePlanning() {
    if (this.planning) {
      this.planningService.updatePlanning(this.planning).subscribe({
        next: (response: any) => {
          this.planning = response.updatedPlanning;
          this.updateList();
          console.log(this.list);
        },
        error: (err) => console.log(err),
      });
    }
  }

  updateList() {
    this.list = [];
    this.planning.days.forEach((day: Day) => {
      day.recipes?.forEach((recipe) => {
        recipe.ingredients?.forEach((ingredient: Ingredient) => {
          this.list.push(ingredient);
        });
      });
    });
  }

  saveName(updatedName: string, index: number) {
    this.planning.days[index].name = updatedName;
    this.updatePlanning();
  }

  removeRecipe(indexDay: number, indexMeal: number) {
    this.planning.days[indexDay].recipes?.splice(indexMeal, 1);
    this.updatePlanning();
  }

  addDay() {
    this.planning.days.push({});
    this.updatePlanning();
  }

  removeDay(index: number) {
    this.planning.days.splice(index, 1);
    this.updatePlanning();
  }

  deletePlanning() {
    this.planning.days.splice(0);
    this.updatePlanning();
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  ngOnInit() {
    this.getPlanning();
  }
}
