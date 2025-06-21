import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDto } from '../models/project.dto';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${enviroment.apiUrl}/Projects`;
  private http = inject(HttpClient);
  constructor() { }

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
