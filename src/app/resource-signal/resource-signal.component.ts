import { Component, resource, signal } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-resource-signal',
  imports: [JsonPipe],
  templateUrl: './resource-signal.component.html',
  styleUrl: './resource-signal.component.css',
})
export class ResourceSignalComponent {
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

  nextUser() {
    this.userId.update((userId) => userId + 1);
  }

  reloadUser() {
    this.userResource.reload();
  }
}
