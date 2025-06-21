import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItemDto } from '../models/todo-item.dto';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${enviroment.apiUrl}/TodoItems`;
  private http = inject(HttpClient);

  constructor() { }

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
}
