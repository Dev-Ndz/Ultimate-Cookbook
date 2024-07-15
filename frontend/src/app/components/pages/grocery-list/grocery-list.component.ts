import { Component } from '@angular/core';
import { IngredientComponent } from '../../ingredient/ingredient.component';
import { GroceryListService } from '../../../services/grocery-list.service';
import { GroceryList } from '../../../models/groceryList.interface';
import { CommonModule } from '@angular/common';

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
  isLoading = false;

  getGroceryList() {
    this.isLoading = true;
    this.groceryListService.getGroceryList().subscribe({
      next: (response: any) => {
        this.groceryList = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.getGroceryList();
  }
}
