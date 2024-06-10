import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { PlanningComponent } from './components/planning/planning.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';

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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
