import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Ingredient } from '../models/ingredient.interface';
import { GroceryList } from '../models/groceryList.interface';

@Injectable({
  providedIn: 'root',
})
export class GroceryListService {
  constructor(private http: HttpClient) {}

  getGroceryList() {
    return this.http.get(environment.apiUrl + '/grocery-list');
  }

  addToList(list: Ingredient[]) {
    return this.http.post(environment.apiUrl + '/grocery-list', list);
  }

  updateList(list: GroceryList) {
    return this.http.put(environment.apiUrl + '/grocery-list', list);
  }
}
