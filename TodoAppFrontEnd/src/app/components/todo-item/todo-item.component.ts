import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemDto } from '../../models/todo-item.dto';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: TodoItemDto;

  @Output() toggleComplete = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() updateTodo = new EventEmitter<{ id: number; title: string }>();

  isEditing = false;
  editedTitle = '';

  onToggleComplete(): void {
    this.toggleComplete.emit(this.todo.id!);
  }

  onDelete(): void {
    this.deleteTodo.emit(this.todo.id!);
  }

  startEditing(): void {
    this.isEditing = true;
    this.editedTitle = this.todo.title;
  }

  saveEdit(): void {
    if (this.editedTitle.trim()) {
      this.updateTodo.emit({ id: this.todo.id!, title: this.editedTitle.trim() });
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedTitle = this.todo.title;
  }
}
