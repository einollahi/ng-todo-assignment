import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, tap } from 'rxjs/operators';
import { ToDo } from '../models/Todo.model';
import { TodoService } from 'src/app/page/services/todo.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private http: HttpService, private todoService: TodoService) { }

  load(): Promise<boolean> {

    let promise = new Promise<boolean>((resolve, reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(map(todos => {
        return todos.map(todo => {
          return {
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
          }
        })
      }))
      .subscribe((res: ToDo[]) => {
        this.todoService.saveTodoList(res);
        resolve(true);
      }, err => {
        resolve(true);
      })
    });

    return promise;
  }
  
}
