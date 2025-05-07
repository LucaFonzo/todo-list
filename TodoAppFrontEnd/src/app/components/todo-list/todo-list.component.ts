import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../services/todo.service';
import { ProjectService } from '../../services/project.service';
import { TodoItemDto } from '../../models/todo-item.dto';
import { ProjectDto } from '../../models/project.dto';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: TodoItemDto[] = [];
  project: ProjectDto | null = null;
  newTodoTitle: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private todoService: TodoService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = +params['id'];
      if (projectId) {
        this.loadProject(projectId);
        this.loadTodos(projectId);
      } else {
        this.router.navigate(['/projects']);
      }
    });
  }

  loadProject(projectId: number): void {
    this.projectService.getProject(projectId).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: (error) => {
        this.error = 'Error al cargar el proyecto';
        console.error('Error loading project:', error);
        this.router.navigate(['/projects']);
      }
    });
  }

  loadTodos(projectId: number): void {
    this.loading = true;
    this.error = null;
    this.todoService.getTodos(projectId).subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las tareas';
        this.loading = false;
        console.error('Error loading todos:', error);
      }
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim() && this.project) {
      const newTodo: Omit<TodoItemDto, 'id'> = {
        title: this.newTodoTitle.trim(),
        isCompleted: false,
        projectId: this.project.id
      };

      this.todoService.addTodo(newTodo).subscribe({
        next: (todo) => {
          this.todos.push(todo);
          this.newTodoTitle = '';
        },
        error: (error) => {
          this.error = 'Error al agregar la tarea';
          console.error('Error adding todo:', error);
        }
      });
    }
  }

  toggleComplete(todoId: number): void {
    const todo = this.todos.find(t => t.id === todoId);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      this.todoService.toggleTodoStatus(todoId, todo).subscribe({
        next: (updatedTodo) => {
          const index = this.todos.findIndex(t => t.id === todoId);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
        },
        error: (error) => {
          this.error = 'Error al actualizar el estado de la tarea';
          console.error('Error toggling todo:', error);
        }
      });
    }
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      },
      error: (error) => {
        this.error = 'Error al eliminar la tarea';
        console.error('Error deleting todo:', error);
      }
    });
  }

  updateTodo(updateData: { id: number; title: string }): void {
    this.todoService.updateTodo(updateData.id, { title: updateData.title }).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updateData.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => {
        this.error = 'Error al actualizar la tarea';
        console.error('Error updating todo:', error);
      }
    });
  }

  getCompletedTodos(): number {
    return this.todos.filter((todo: TodoItemDto) => todo.isCompleted).length;
  }

  getPendingTodos(): number {
    return this.todos.filter((todo: TodoItemDto) => !todo.isCompleted).length;
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
