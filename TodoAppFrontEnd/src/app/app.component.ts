import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoItemComponent, TodoListComponent, ProjectListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TodoAppFrontEnd';
}
