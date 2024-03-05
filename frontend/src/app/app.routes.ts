import { Routes } from '@angular/router';
import { ProyectListComponent } from './components/proyect-list/proyect-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', component: ProyectListComponent },
  { path: 'proyect/:id', component: TaskListComponent }
];
