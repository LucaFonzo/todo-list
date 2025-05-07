import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'todos/:id', component: TodoListComponent }
];
