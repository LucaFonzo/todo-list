import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/Task';
import { TaskForm } from './models/TaskForm';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private readonly API_URL = 'http://localhost:8080/api/task';
  http = inject(HttpClient);
  constructor() {

  }

  getAll(id: number) {
    return this.http.get<Task[]>(`${this.API_URL}/proyect/${id}`);
  }
  add(t: TaskForm) {
    return this.http.post<Task>(this.API_URL, t);
  }
  delete(id: number) {
    return this.http.delete<Task>(`${this.API_URL}/${id}`);
  }

  update(t: Task) {
    return this.http.put<Task>(`${this.API_URL}/${t.id}`,t);
  }
}
