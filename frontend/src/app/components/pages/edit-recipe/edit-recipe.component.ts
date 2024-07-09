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
import { ImagesService } from '../../../services/images.service';
import { DialogModule } from 'primeng/dialog';
import { NoopAnimationPlayer } from '@angular/animations';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IngredientComponent,
    DialogModule,
    ButtonModule,
  ],
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
  selectedFile: File | null = null;
  formData: FormData = new FormData();
  visible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private imageService: ImagesService
  ) {}

  getRecipe(): void {
    this.isEditMode = true;
    this.recipeService.getRecipeById(this.id!).subscribe({
      next: (response: any) => {
        this.recipe = new RecipeModel(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  showDialog() {
    this.visible = true;
  }
  onSave(): void {
    if (this.selectedFile) {
      this.formData.append('image', this.selectedFile, this.selectedFile.name);
      this.imageService.uploadImage(this.formData).subscribe({
        next: (response: any) => {
          this.recipe.image = response.path;
          console.log(
            'PICTURE UPLOADED TO : ',
            response.path,
            'RECIPE IMAGE URL: ',
            this.recipe.image
          );
          this.updateRecipe();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.updateRecipe;
    }
  }

  updateRecipe(): void {
    console.log('sending edited recipe', this.recipe);
    this.recipeService.editRecipe(this.id!, this.recipe).subscribe({
      next: (response: any) => {
        this.router.navigate(['recipe/' + this.id]);
      },
      error: (error) => {
        console.log('ERROR', error);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const imgSrc = URL.createObjectURL(this.selectedFile);
      this.recipe.image = imgSrc;
      console.log('image changed after file selected : ', this.recipe);
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
