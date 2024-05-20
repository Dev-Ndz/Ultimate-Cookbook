import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { PlanningComponent } from './components/planning/planning.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user',
        component: UserPageComponent,
      },
      {
        path: 'list',
        component: GroceryListComponent,
      },
      {
        path: 'planning',
        component: PlanningComponent,
      }
];
