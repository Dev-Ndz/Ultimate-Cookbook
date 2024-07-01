import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../../../models/recipe';
import { ingredient } from '../../../models/ingredient.interface';
import { CommonModule } from '@angular/common';
import { AddToListComponent } from '../../buttons/add-to-list/add-to-list.component';
import { AddToPlanningComponent } from '../../buttons/add-to-planning/add-to-planning.component';
import { RecipeModel } from '../../../models/recipe.model';
import { IngredientModel } from '../../../models/ingredient.model';

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
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  recipe!: Recipe;

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http
      .get('https://ultimate-cookbook-8beb64e72401.herokuapp.com/recipe/' + id)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          // Map ingredients to IngredientModel instances
          const ingredients = response.recipe.ingredients.map(
            (ingredient: ingredient) =>
              new IngredientModel(
                ingredient.quantity,
                ingredient.name,
                ingredient.unit
              )
          );

          // Create a RecipeModel instance
          this.recipe = new RecipeModel(
            response.recipe._id,
            response.recipe.title,
            response.recipe.author,
            response.recipe.content,
            ingredients,
            response.recipe.createdAt,
            response.recipe.updatedAt,
            response.recipe.categories,
            response.recipe.time,
            response.recipe.image
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.getRecipe();
  }
}
