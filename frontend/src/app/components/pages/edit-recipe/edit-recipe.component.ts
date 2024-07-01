import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IngredientModel } from '../../../models/ingredient.model';
import { RecipeModel } from '../../../models/recipe.model';
import { ingredient } from '../../../models/ingredient.interface';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent {
  isEditMode: boolean = false;
  recipe: Recipe = {
    title: '',
    content: [''],
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.http
        .get(
          'https://ultimate-cookbook-8beb64e72401.herokuapp.com/recipe/' + id
        )
        .subscribe({
          next: (response: any) => {
            this.recipe = response.recipe;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  save(): void {
    console.log(this.recipe);
  }

  ngOnInit() {
    this.getRecipe();
  }
}
