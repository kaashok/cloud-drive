import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  public get showSpinner() {
    return this.showSpinner$.value;
  }

  public set showSpinner(show: boolean) {
    this.showSpinner$.next(show);
  }
}
