import { Component } from '@angular/core';
import { Task } from '../model/taskmodel';
import { TaskService } from '../service/taskservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: 'app.html',
  styleUrls: ['app.css']
})
export class AppComponent {
  title = 'todo-app';
  tasks: Task[] = [];
  taskTitle: string = '';
  private nextId = 1;

  constructor(private taskservice: TaskService) {
    this.tasks = this.taskservice.getTasks();
    this.nextId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
  }

  addTask() {
    if (!this.taskTitle.trim()) return;

    this.tasks.push({
      id: this.nextId++,
      title: this.taskTitle.trim(),
      completed: false
    });
    this.taskTitle = '';
    this.save();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  toggleTask(id: number) {
  this.tasks = this.tasks.map(t =>
    t.id === id ? { ...t, completed: true } : t
  );

  const index = this.tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    (this.tasks[index] as any).toDelete = true;

    setTimeout(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.save();
    }, 500); 
  }
}


  private save() {
    this.taskservice.saveTasks(this.tasks);
  }
}
