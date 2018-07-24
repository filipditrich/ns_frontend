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
      this.persistent = event instanceof NavigationStart;
    });
  }

  getAlert(id: string): Observable<any> {
    return this.subject.asObservable().pipe(filter((alert: Alert) => alert && alert.id === id));
  }

  alertInfo(payload: AlertPayload, ttl: number = Infinity, redirectUrl: string = null) {
    this.sendAlert(new Alert({ type: AlertType.Info, payload, ttl, redirectUrl }));
  }

  alertDanger(payload: AlertPayload, ttl: number = Infinity, redirectUrl: string = null) {
    this.sendAlert(new Alert({ type: AlertType.Danger, payload, ttl, redirectUrl }));
  }

  alertSuccess(payload: AlertPayload, ttl: number = Infinity, redirectUrl: string = null) {
    this.sendAlert(new Alert({ type: AlertType.Success, payload, ttl, redirectUrl }));
  }

  sendAlert(alert: Alert) {
    this.persistent = true;
    this.subject.next(alert);
  }

  clearAlerts(id?: string) {
    this.subject.next(new Alert({ id }));
  }

}
