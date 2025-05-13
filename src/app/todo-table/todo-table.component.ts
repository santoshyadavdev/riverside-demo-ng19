import { Component, input } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent {
  todos = input.required<Todo[] | undefined>();
}
