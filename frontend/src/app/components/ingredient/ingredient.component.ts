import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngredientModel } from '../../models/ingredient.model';
import { ingredient } from '../../models/ingredient.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
})
export class IngredientComponent {
  @Input() ingredient!: ingredient;
  @Input() isActive!: boolean;
  @Output() ingredientChange = new EventEmitter<ingredient>();

  onIngredientChange() {
    this.ingredientChange.emit(this.ingredient);
  }
}
