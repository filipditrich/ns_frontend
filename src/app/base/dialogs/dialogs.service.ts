import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Dialog, DialogPayload } from './dialogs.interface';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  private subject = new Subject<any>();

  constructor(private router: Router) { }

  getDialog(id: string): Observable<any> {
    return this.subject.asObservable().pipe(filter((dialog: Dialog) => dialog && dialog.id === id));
  }

  dialogInfo(payload: DialogPayload) {
    this.sendDialog(new Dialog({ payload}));
  }

  dialogDanger(payload: DialogPayload) {
    this.sendDialog(new Dialog({ payload }));
  }


  sendDialog(dialog: Dialog) {
    this.subject.next(dialog);
  }

  clearDialogs(id?: string) {
    this.subject.next(new Dialog({ id }));
  }

}
