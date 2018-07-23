import { Injectable } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Alert, AlertPayload, AlertType} from './alerts.interface';
import {Observable, Subject} from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private subject = new Subject<any>();
  private persistent = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.persistent = true;
      } else {
        this.clearAlerts();
      }
    })
  }

  getAlert(id: string): Observable<any> {
    return this.subject.asObservable().pipe(filter((alert: Alert) => alert && alert.id === id));
  }

  alertInfo(payload: AlertPayload, ttl: number = Infinity, redirectUrl: string = null) {
    this.sendAlert(new Alert({ type: AlertType.Info, payload, ttl, redirectUrl }));
  }

  sendAlert(alert: Alert) {
    this.persistent = true;
    this.subject.next(alert);
  }

  clearAlerts(id?: string) {
    this.subject.next(new Alert({ id }));
  }

}
