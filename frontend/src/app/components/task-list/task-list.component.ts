import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskServiceService } from '../../services/task-service.service';
import { Task } from '../../services/models/Task';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgClass,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = []
  idProyect = -1;
  name = "";
  description = "";
  rank = 0;
  vacio = false;
  editedId: number | null = 0;
  newName = "";
  newDescription = "";
  newRank = 0;
  private readonly _taskService = inject(TaskServiceService);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProyect = params['id'];
    });
    this.getTasks();
  }

  delete(id: number) {
    this._taskService.delete(id).subscribe(result => {
      console.log(result);
      this.tasks = this.tasks.filter(t => t.id !== id);
    })
  }

  getTasks() {
    return this._taskService.getAll(this.idProyect).subscribe(result => {
      this.tasks = result;
    });
  }

  add() {
    if (this.name === '' || this.description === '' || this.rank === 0) {
      this.vacio = true;
      setTimeout(() => {
        this.vacio = false;
      }, 1000);
    } else {
      this._taskService.add({ name: this.name, description: this.description, rank: this.rank, isComplete: false, idProyect: this.idProyect }).subscribe(result => {
      this.tasks.push(result);
    });
    }
  }

  edit(t: Task) {
    this.editedId = t.id;
    this.newName = t.name;
    this.newDescription = t.description;
    this.newRank = t.rank;
  }

  update(task: Task) {
    task.name = this.newName;
    task.description = this.newDescription;
    task.rank = this.newRank;
    this._taskService.update(task).subscribe(result => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.tasks.unshift(result);
      this.editedId = null;
    })
  }
}
