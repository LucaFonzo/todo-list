import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks = [
    {
      id: 1,
      name: "Task 1",
      description: "Description 1",
      rank: 1,
      isComplete: true
    },
    {
      id: 2,
      name: "Task 2",
      description: "Description 2",
      rank: 5,
      isComplete: false
    },
    {
      id: 3,
      name: "Task 3",
      description: "Description 3",
      rank: 3,
      isComplete: false
    },
    {
      id: 4,
      name: "Task 4",
      description: "Description 4",
      rank: 3,
      isComplete: false
    },
    {
      id: 5,
      name: "Task 5",
      description: "Description 5",
      rank: 3,
      isComplete: false
    }
  ]

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    rank: new FormControl('', Validators.required)
  })
  delete(id: number) {
    console.log("Deleting.." + id);
    this.tasks = this.tasks.filter(t => t.id != id);
  }
  add() {
    console.log(this.taskForm.value);
  }
}
