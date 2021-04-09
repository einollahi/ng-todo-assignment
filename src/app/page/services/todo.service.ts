import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDo } from 'src/app/shared/models/Todo.model';

@Injectable({providedIn: 'root'})
export class TodoService {
  private todoLists: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);

  getTodoList(): Observable<ToDo[]> {
    return this.todoLists.asObservable();
  }

  saveTodoList(list: ToDo[]): void {
    this.todoLists.next(list);
  }
  
}