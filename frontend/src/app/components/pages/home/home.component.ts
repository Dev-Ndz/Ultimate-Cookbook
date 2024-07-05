import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../recipe-card/recipe-card.component';
import { Recipe } from '../../../models/recipe';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private recipeService: RecipeService) {}

  recipes: Recipe[] = [];

  getRecipes = () => {
    this.recipeService.getRecipes().subscribe({
      next: (data: any) => (this.recipes = data),
      error: (err) => console.log(err),
    });
  };

  ngOnInit() {
    this.getRecipes();
  }
}
