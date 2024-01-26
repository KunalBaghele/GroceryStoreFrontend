import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Groceries',
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
