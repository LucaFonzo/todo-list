import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItemDto } from '../models/todo-item.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5299/api/TodoItems';

  constructor(private http: HttpClient) { }

  getTodos(projectId: number): Observable<TodoItemDto[]> {
    return this.http.get<TodoItemDto[]>(`${this.apiUrl}/project/${projectId}`);
  }

  addTodo(todo: Omit<TodoItemDto, 'id'>): Observable<TodoItemDto> {
    return this.http.post<TodoItemDto>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: Partial<TodoItemDto>): Observable<TodoItemDto> {
    return this.http.put<TodoItemDto>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleTodoStatus(id: number, todo: TodoItemDto): Observable<TodoItemDto> {
    return this.http.patch<TodoItemDto>(`${this.apiUrl}/${id}`, todo);
  }
}
