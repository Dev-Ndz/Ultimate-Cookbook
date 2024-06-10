import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../recipe-card/recipe-card.component';
import { Recipe } from '../../../models/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  recipes: Recipe[] = [];

  getRecipes = () => {
    this.http
      .get('https://ultimate-cookbook-8beb64e72401.herokuapp.com/recipe')
      .subscribe({
        next: (data: any) => (this.recipes = data),
        error: (err) => console.log(err),
      });
  };

  ngOnInit() {
    this.getRecipes();
  }
}
