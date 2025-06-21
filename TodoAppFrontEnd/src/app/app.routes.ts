import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectListComponent,canActivate: [AuthGuard]},
  { path: 'todos/:id', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
