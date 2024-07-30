import { Component, Input, SimpleChanges } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { Ingredient } from '../../../models/ingredient.interface';
import { DialogModule } from 'primeng/dialog';
import { IngredientComponent } from '../../ingredient/ingredient.component';
import { CommonModule } from '@angular/common';
import { IngredientModel } from '../../../models/ingredient.model';
import { GroceryListService } from '../../../services/grocery-list.service';

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [DialogModule, IngredientComponent, CommonModule],
  templateUrl: './add-to-list.component.html',
  styleUrl: './add-to-list.component.scss',
})
export class AddToListComponent {
  visible: boolean = false;
  @Input() ingredients!: Ingredient[];
  @Input() size!: string;
  selectedIngredients: Ingredient[] = [];

  constructor(private groceryListService: GroceryListService) {}

  showDialog() {
    this.visible = true;
    this.ingredients = this.ingredients!.map((ingredient: Ingredient) => ({
      ...ingredient,
      isChecked: true,
    }));
  }
  closeDialog() {
    this.selectedIngredients = [];
    this.visible = false;
  }
  handleCheck(index: number, updatedIngredient: Ingredient) {
    console.log('check detected');
    this.ingredients![index] = updatedIngredient;
  }
  addToList() {
    this.ingredients?.forEach((ingredient: Ingredient) => {
      console.log(ingredient);
      console.log(ingredient.isChecked);
      if (ingredient.isChecked) {
        ingredient.isChecked = false;
        this.selectedIngredients.push(ingredient);
      }
    });
    console.log(this.selectedIngredients);
    this.groceryListService.addToList(this.selectedIngredients).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
    this.closeDialog();
  }

  ngOnInit() {
    this.ingredients?.forEach(
      (ingredient: Ingredient) => (ingredient.isChecked = true)
    );
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['ingredients']) {
  //     // Perform any necessary actions when ingredients input changes
  //     console.log(
  //       'Ingredients have changed:',
  //       changes['ingredients'].currentValue
  //     );
  //   }
  // }
}
