import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngredientModel } from '../../models/ingredient.model';
import { Ingredient } from '../../models/ingredient.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Unit } from '../../models/unit.enum';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
})
export class IngredientComponent {
  @Input() ingredient!: Ingredient;
  @Input() isActive!: boolean;
  @Output() ingredientChange = new EventEmitter<Ingredient>();
  @Output() delete = new EventEmitter<number>();
  units = Object.values(Unit);

  deleteIngredient() {
    this.delete.emit();
  }

  onIngredientChange() {
    this.ingredientChange.emit(this.ingredient);
  }

  ngOnInit() {
    this.ingredient = new IngredientModel(
      this.ingredient.quantity,
      this.ingredient.name,
      this.ingredient.unit
    );
  }
}
