import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private accessToken$: BehaviorSubject<string> = new BehaviorSubject("");  
  constructor() {
    const accessToken = sessionStorage.getItem('access-token');
    if (accessToken) {
      this.accessToken$.next(accessToken);
    }   
  }

  get accessToken() {
    return this.accessToken$.value;
  }

  set accessToken(token: string) {
    this.accessToken$.next(token);
    sessionStorage.setItem('access-token', token);
  }  
}
