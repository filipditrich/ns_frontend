import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private subject = new BehaviorSubject<boolean>(true);
  menuMinified = this.subject.asObservable();

  constructor() { }

  toggleMenu(state: boolean) {
    this.subject.next(state);
  }


}
