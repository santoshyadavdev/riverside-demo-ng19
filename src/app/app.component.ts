import {
  Component,
  computed,
  effect,
  linkedSignal,
  OnInit,
  resource,
  untracked,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { Todo } from './todo.model';
import { User } from './user.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoTableComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'riverside-demo-ng19';

  firstName = signal('Morgan');
  tempFirstName = signal('Morgan');
  counter = signal(0);

  // New signals for dropdown
  dropdownValues = signal(['Option 1', 'Option 2', 'Option 3']);
  selectedValue = linkedSignal(() => this.dropdownValues()[0]);

  todoList = httpResource<Todo[]>(
    () => `https://jsonplaceholder.typicode.com/todos`
  );

  firstNameCapitalized = computed(() => this.firstName().toUpperCase());

  effectFn = effect((oncleanup) => {
    console.log(
      `The name is: ${this.firstName()} and count ${untracked(this.counter)}`
    );
  });

  userId = signal(1);

  userRxResource = rxResource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }): Observable<User> =>
      fromFetch(`https://jsonplaceholder.typicode.com/users/${request.id}`, {
        selector: (response) => response.json(),
      }),
  });

  userResource = resource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }): Promise<User> => {
      // You need to parse the JSON response from fetch
      return fetch(
        `https://jsonplaceholder.typicode.com/users/${request.id}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    },
  });

  ngOnInit(): void {}

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tempFirstName.set(input.value);
    this.counter.update((c) => c + 1);
  }

  updateFirstName(): void {
    this.firstName.set(this.tempFirstName());
  }

  stopLogging() {
    this.effectFn.destroy();
  }

  onDropdownChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedValue.set(select.value);
  }

  updateOptions() {
    this.dropdownValues.set(['Ground', 'Air', 'Sea']);
  }

  nextUser() {
    this.userId.update((userId) => userId + 1);
  }

  reloadUser() {
    this.userResource.reload();
  }
}
