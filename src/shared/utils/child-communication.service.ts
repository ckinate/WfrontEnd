

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildCommunicationService {
  private childFunctionSubject = new Subject<void>();

  childFunctionCalled$ = this.childFunctionSubject.asObservable();

  callChildFunction() {
    this.childFunctionSubject.next();
  }
}
