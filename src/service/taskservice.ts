import { Injectable } from '@angular/core';
import { Task } from '../model/taskmodel';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private storageKey = 'tasks';

  getTasks(): Task[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  saveTasks(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
