import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-linked-signal',
  imports: [],
  templateUrl: './linked-signal.component.html',
  styleUrl: './linked-signal.component.css',
})
export class LinkedSignalComponent {
  // New signals for dropdown
  dropdownValues = signal(['Option 1', 'Option 2', 'Option 3']);
  selectedValue = linkedSignal(() => this.dropdownValues()[0]);

  onDropdownChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedValue.set(select.value);
  }

  updateOptions() {
    this.dropdownValues.set(['Ground', 'Air', 'Sea']);
  }
}
