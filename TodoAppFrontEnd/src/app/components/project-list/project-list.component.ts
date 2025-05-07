import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectDto } from '../../models/project.dto';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects: ProjectDto[] = [];
  loading: boolean = false;
  error: string | null = null;
  newProjectName: string = '';
  newProjectDescription: string = '';

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los proyectos';
        this.loading = false;
        console.error('Error loading projects:', error);
      }
    });
  }

  createProject(): void {
    if (this.newProjectName.trim()) {
      const newProject: Omit<ProjectDto, 'id'> = {
        name: this.newProjectName.trim(),
        description: this.newProjectDescription.trim()
      };

      this.projectService.createProject(newProject).subscribe({
        next: (project) => {
          this.projects.push(project);
          this.newProjectName = '';
          this.newProjectDescription = '';
        },
        error: (error) => {
          this.error = 'Error al crear el proyecto';
          console.error('Error creating project:', error);
        }
      });
    }
  }

  navigateToProject(projectId: number): void {
    this.router.navigate(['/todos', projectId]);
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(project => project.id !== id);
      },
      error: (error) => {
        this.error = 'Error al eliminar el proyecto';
        console.error('Error deleting project:', error);
      }
    });
  }
}
