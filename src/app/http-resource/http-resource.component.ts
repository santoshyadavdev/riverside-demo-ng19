import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoTableComponent } from '../todo-table/todo-table.component';

@Component({
  selector: 'app-http-resource',
  imports: [TodoTableComponent],
  templateUrl: './http-resource.component.html',
  styleUrl: './http-resource.component.css',
})
export class HttpResourceComponent {
  todoList = httpResource<Todo[]>(
    () => `https://jsonplaceholder.typicode.com/todos`
  );
}
