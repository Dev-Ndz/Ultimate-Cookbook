import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get(environment.apiUrl + '/recipe');
  }

  getRecipeById(id: String) {
    return this.http.get(environment.apiUrl + '/recipe/' + id);
  }

  createRecipe(recipe: Recipe) {
    return this.http.post(environment.apiUrl + '/recipe', recipe);
  }

  editRecipe(id: String, recipe: Recipe) {
    return this.http.put(environment.apiUrl + '/recipe/' + id, recipe);
  }

  deleteRecipe(id: String) {
    return this.http.delete(environment.apiUrl + id);
  }
}
