import { Component, Input } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ChoosePictureDialogComponent } from '../../choose-picture-dialog/choose-picture-dialog.component';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IngredientComponent,
    DialogModule,
    ButtonModule,
    ChoosePictureDialogComponent,
  ],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent {
  recipe: Recipe = {
    title: '',
    content: [''],
    ingredients: [new IngredientModel(0, '', Unit.Piece)],
  };
  newRecipe: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  /*********************
   *                   *
   *      ON INIT      *
   *                   *
   *********************/

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (response: any) => {
          this.recipe = new RecipeModel(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.newRecipe = true;
    }
  }

  ngOnInit() {
    this.getRecipe();
  }

  /**********************
   *                    *
   *   MODIFY RECIEPE   *
   *                    *
   **********************/

  /*INGREDIENTS
   *************/
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

  /*CONTENT
   *********/
  addStep() {
    this.recipe.content.push('');
  }
  deleteStep(index: number) {
    this.recipe.content.splice(index, 1);
  }
  trackByFn(index: any, item: any) {
    return index;
  }

  /*IMAGE
   *******/
  updateImage(url: string) {
    this.recipe.image = url;
  }

  /**********************
   *                    *
   *    SAVE CHANGES    *
   *                    *
   **********************/

  updateRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.editRecipe(id, this.recipe).subscribe({
        next: (response: any) => {
          this.router.navigate(['recipe/' + id]);
        },
        error: (error) => {
          console.log('ERROR', error);
        },
      });
    }
  }

  createRecipe(): void {
    this.recipeService.createRecipe(this.recipe).subscribe({
      next: (response: any) => {
        let id: string = response.id;
        this.router.navigate(['recipe/' + id]);
      },
      error: (error) => {
        console.log('ERROR', error);
      },
    });
  }
}
