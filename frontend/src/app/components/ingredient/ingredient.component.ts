import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() canEdit: boolean = true;
  @Input() index?: number;
  @Output() ingredientChange = new EventEmitter<Ingredient>();
  @Output() emitIngredient = new EventEmitter<Ingredient>();
  @Output() delete = new EventEmitter<number>();
  units = Object.values(Unit);

  deleteIngredient() {
    this.delete.emit();
  }

  onIngredientChange() {
    console.log(this.ingredient);
    this.ingredientChange.emit(this.ingredient);
  }

  saveIngredient() {
    this.emitIngredient.emit(this.ingredient);
    this.isActive = false;
  }

  ngOnInit() {
    this.ingredient = new IngredientModel(
      this.ingredient.quantity,
      this.ingredient.name,
      this.ingredient.unit,
      this.ingredient.isChecked
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['ingredient'];
    console.log('Change detected', change);
    this.ingredient = new IngredientModel(
      this.ingredient.quantity,
      this.ingredient.name,
      this.ingredient.unit,
      this.ingredient.isChecked
    );
  }
}
