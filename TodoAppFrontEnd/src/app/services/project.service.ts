import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDto } from '../models/project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5299/api/Projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  getProject(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Omit<ProjectDto, 'id'>): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(this.apiUrl, project);
  }

  updateProject(id: number, project: Partial<ProjectDto>): Observable<ProjectDto> {
    return this.http.put<ProjectDto>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
