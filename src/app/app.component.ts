import { Component, computed, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { Todo } from './todo.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'riverside-demo-ng19';

  firstName = signal('Morgan');
  tempFirstName = signal('Morgan');

  todoList = httpResource<Todo[]>(
    () => `https://jsonplaceholder.typicode.com/todos`
  );

  firstNameCapitalized = computed(() => this.firstName().toUpperCase());

  effectFn = effect(() => {
    console.log(`The name is: ${this.firstName()}`);
  });

  ngOnInit(): void {}

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tempFirstName.set(input.value);
  }

  updateFirstName(): void {
    this.firstName.set(this.tempFirstName());
  }

  stopLogging() {
    this.effectFn.destroy();
  }
}
