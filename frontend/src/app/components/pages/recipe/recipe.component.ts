import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  recipe!: Recipe;

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http
      .get('https://ultimate-cookbook-8beb64e72401.herokuapp.com/recipe/' + id)
      .subscribe({
        next: (response: any) => {
          console.log('fetching post :', response);
          this.recipe = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.getRecipe();
  }
}
