import { Component } from '@angular/core';
import { IngredientComponent } from '../../ingredient/ingredient.component';
import { GroceryListService } from '../../../services/grocery-list.service';
import { GroceryList } from '../../../models/groceryList.interface';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../models/ingredient.interface';
import { Unit } from '../../../models/unit.enum';
import { IngredientModel } from '../../../models/ingredient.model';

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [IngredientComponent, CommonModule],
  templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.scss',
})
export class GroceryListComponent {
  constructor(private groceryListService: GroceryListService) {}
  groceryList?: GroceryList;
  newItem = {
    quantity: 0,
    name: '',
    unit: Unit.Piece,
    isChecked: false,
  };
  visibility = false;

  getGroceryList() {
    this.groceryListService.getGroceryList().subscribe({
      next: (response: any) => {
        this.groceryList = response;
        this.sortIngredients();
        this.groceryList?.ingredients?.forEach((ingredient: Ingredient) => {
          ingredient = new IngredientModel(
            ingredient.quantity,
            ingredient.name,
            ingredient.unit,
            ingredient.isChecked
          );
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateList() {
    if (this.groceryList) {
      this.groceryListService.updateList(this.groceryList).subscribe({
        next: (response: any) => {
          this.getGroceryList();
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteList() {
    if (this.groceryList) {
      this.groceryList.ingredients = [];
    }
    this.updateList();
  }

  displayNewIngredient() {
    this.visibility = true;
  }

  hideNewIngredient() {
    this.visibility = false;
  }

  addItem(newIngredient: Ingredient) {
    console.log(newIngredient);
    this.groceryList?.ingredients?.push(newIngredient);
    this.updateList();
    this.hideNewIngredient();
  }
  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.groceryList!.ingredients![index] = updatedIngredient;
    this.updateList();
  }

  deleteIngredient(index: number) {
    this.groceryList!.ingredients!.splice(index, 1);
    this.updateList();
  }

  sortIngredients() {
    this.groceryList?.ingredients?.sort(
      (a, b) => Number(a.isChecked) - Number(b.isChecked)
    );
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnInit() {
    this.getGroceryList();
  }
}
