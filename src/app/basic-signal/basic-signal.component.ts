import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-basic-signal',
  imports: [],
  templateUrl: './basic-signal.component.html',
  styleUrl: './basic-signal.component.css',
})
export class BasicSignalComponent {
  firstName = signal('Morgan');
  tempFirstName = signal('Morgan');
  counter = signal(0);
  state = inject(StateService);

  count = this.state.count;

  firstNameCapitalized = computed(() => this.firstName().toUpperCase());

  effectFn = effect(() => {
    console.log(
      `The name is: ${this.firstName()} and count ${this.counter()}`
    );
  });

  userId = signal(1);

  constructor() {
    // effect(() => {
    //   console.log(
    //     `The name is: ${this.firstName()} and count ${this.counter()}`
    //   );
    // });
  }

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
}
