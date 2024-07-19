import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../../../models/recipe';
import { Ingredient } from '../../../models/ingredient.interface';
import { CommonModule } from '@angular/common';
import { AddToListComponent } from '../../buttons/add-to-list/add-to-list.component';
import { AddToPlanningComponent } from '../../buttons/add-to-planning/add-to-planning.component';
import { RecipeModel } from '../../../models/recipe.model';
import { IngredientModel } from '../../../models/ingredient.model';
import { RecipeService } from '../../../services/recipe.service';
import { Unit } from '../../../models/unit.enum';
import { NewRecipeComponent } from '../../buttons/new-recipe/new-recipe.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    AddToListComponent,
    AddToPlanningComponent,
    RouterLink,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  recipe!: Recipe;
  id!: string;
  recipeData!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  getRecipe(id: string): void {
    if (this.id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (recipe: any) => {
          this.recipe = new RecipeModel(recipe);
          this.recipeData = new RecipeModel(this.recipe);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getRecipe(this.id);
  }
}
