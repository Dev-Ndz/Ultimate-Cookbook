import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '../../../models/recipe.model';
import { ingredient } from '../../../models/ingredient.interface';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from '../../ingredient/ingredient.component';
import { RecipeService } from '../../../services/recipe.service';
import { IngredientModel } from '../../../models/ingredient.model';
import { Unit } from '../../../models/unit.enum';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule, IngredientComponent],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent {
  isEditMode: boolean = false;
  recipe: Recipe = {
    title: '',
    content: [''],
    ingredients: [new IngredientModel(0, '', Unit.Piece)],
  };
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  getRecipe(): void {
    if (this.id) {
      this.isEditMode = true;
      this.recipeService.getRecipeById(this.id).subscribe({
        next: (response: any) => {
          this.recipe = new RecipeModel(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  save(): void {
    if (this.id) {
      this.recipeService.editRecipe(this.id, this.recipe).subscribe({
        next: (response: any) => {
          this.router.navigate(['recipe/' + this.id]);
        },
        error: (error) => {
          console.log('ERROR', error);
        },
      });
    }
  }

  handleIngredientChange(index: number, updatedIngredient: ingredient) {
    console.log('Ingredient changed:', updatedIngredient, index);
    this.recipe.ingredients![index] = updatedIngredient;
  }
  addIngredient() {
    this.recipe.ingredients!.push(new IngredientModel(0, '', Unit.Piece));
  }
  deleteIngredient(index: number) {
    console.log(index);
    this.recipe.ingredients!.splice(index, 1);
  }
  addStep() {
    this.recipe.content.push('');
  }
  deleteStep(index: number) {
    this.recipe.content.splice(index, 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnInit() {
    this.getRecipe();
  }
}
