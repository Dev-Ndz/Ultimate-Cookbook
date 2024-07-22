import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent {
  @Input() name!: string;
  @Output() emitName = new EventEmitter<string>();
  editMode: boolean = false;
  input?: string;

  saveName() {
    if (this.input) {
      this.name = this.input;
      this.emitName.emit(this.name);
      this.editMode = false;
    }
  }
  exitEditMode() {
    this.editMode = false;
    this.input = '';
  }
}
