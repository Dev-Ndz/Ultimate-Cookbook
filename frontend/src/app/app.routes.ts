import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { GroceryListComponent } from './components/pages/grocery-list/grocery-list.component';
import { PlanningComponent } from './components/pages/planning/planning.component';
import { LoginComponent } from './components/pages/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './components/pages/register/register.component';
import { RecipeComponent } from './components/pages/recipe/recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'list',
    component: GroceryListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [authGuard],
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
