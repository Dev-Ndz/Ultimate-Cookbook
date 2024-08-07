import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

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
  canEdit: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private userService: UserService
  ) {}

  getRecipe(id: string): void {
    if (this.id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (recipe: any) => {
          this.recipe = new RecipeModel(recipe);
          this.recipeData = new RecipeModel(this.recipe);
          console.log(this.recipe);
          this.canEdit = this.checkIfAuthor();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  deleteRecipe() {
    if (this.recipe._id) {
      this.recipeService.deleteRecipe(this.recipe._id).subscribe({
        next: (response) => {
          this.router.navigate(['']);
        },
        error: (err) => console.log(err),
      });
    }
  }

  checkIfAuthor() {
    let user: User = this.userService.getUser();
    console.log('user id : ', user.id);
    console.log('author : ', this.recipe.author);
    if (user.id == this.recipe.author) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getRecipe(this.id);
  }
}
