import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { v4 } from 'uuid';
import { ToDo } from 'src/app/shared/models/Todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['position', 'title', 'completed', 'edit', 'delete']
  
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    completed: new FormControl(null)
  });
  editMode: boolean = false;

  searchField: FormControl = new FormControl(null);
  statusField: FormControl = new FormControl(null);

  todoList: ToDo[];
  todoSubscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoSubscription.add(
      this.todoService.getTodoList()
        .subscribe((res: ToDo[]) => {
          this.todoList = res;
          this.loadTodoList(res);
        })
      );

    this.todoSubscription.add(
      this.todoForm.get('id').valueChanges.subscribe((data: string) => {
        this.editMode = data ? true : false;
      })
    );

    this.todoSubscription.add(
      this.statusField.valueChanges.subscribe((data: boolean) => {
        this.applyStatus();
      })
    );
  }

  ngOnDestroy(): void {
    this.todoSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createOrEditTodo() {
    this.editMode = this.todoForm.get('id').value ? true : false;
    if (this.editMode) {
      this.dataSource.data.forEach(todo => {
        if (todo.id === this.todoForm.get('id').value) {
          todo['title'] = this.todoForm.get('title').value;
          todo['completed'] = this.todoForm.get('completed').value;
        }
      });
    } else {
      this.dataSource.data.unshift({
        id: v4(),
        title: this.todoForm.get('title').value,
        completed: this.todoForm.get('completed').value,
      });
    }
    
    this.todoService.saveTodoList(this.dataSource.data);
    this.todoForm.reset();
    this.applyStatus();
  }

  private loadTodoList(list: ToDo[]) {
    const todoList = list;

    todoList.forEach((todo, i) => {
      todo['position'] = i+1;
    });
    
    this.dataSource.data = todoList;
  }

  editTodoItem(row) {
    const selectedTodo = this.dataSource.data.find(el => el.id === row);
    if (!selectedTodo) return;
    this.todoForm.setValue({
      id: selectedTodo.id,
      title: selectedTodo.title,
      completed: selectedTodo.completed,
    });
  }
  
  deleteTodoItem(row) {
    const newList =  this.dataSource.data.filter(el => el.id !== row)
    this.todoService.saveTodoList(newList);
  }

  cancelTodo() {
    this.todoForm.reset();
  }

  applySearch() {
    const value = this.searchField.value;
    if (!value || !value.toString().trim()) this.dataSource.filter = '';
    else this.dataSource.filter = value.toString().trim();
  }

  private applyStatus() {
    if (this.statusField.value === null) {
      this.loadTodoList(this.todoList);
    } else {
      this.loadTodoList(this.todoList.filter(todo => todo.completed == this.statusField.value));
    }
  }

}
