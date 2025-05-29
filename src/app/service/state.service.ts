import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _count = signal(0);

  constructor() { }

  get count() {
    return this._count;
  }
  increment() {
    this._count.update(value => value + 1);
  }
  decrement() {
    this._count.update(value => value - 1);
  }
  reset() {
    this._count.set(0);
  }
}
