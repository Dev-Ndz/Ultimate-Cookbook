import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';
import { AddToListComponent } from '../buttons/add-to-list/add-to-list.component';
import { AddToPlanningComponent } from '../buttons/add-to-planning/add-to-planning.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, AddToListComponent, AddToPlanningComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
