import { Component, computed, effect, signal, untracked } from '@angular/core';

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

  firstNameCapitalized = computed(() => this.firstName().toUpperCase());

  effectFn = effect((oncleanup) => {
    console.log(
      `The name is: ${this.firstName()} and count ${untracked(this.counter)}`
    );
  });

  userId = signal(1);


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
