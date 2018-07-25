import { Component, OnInit, Input } from '@angular/core';
import { AlertsService } from './alerts.service';
import { Alert, AlertType } from './alerts.interface';
import { AlertTimeout } from '../helpers/general.helper';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'ns-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  animations: [
    trigger('alerts', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('500ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('250ms ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class AlertsComponent implements OnInit {

  @Input() id: string;
  alerts: Alert[] = [];
  timers = [];

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {

    this.alertsService.getAlert(this.id).subscribe((alert: Alert) => {
      if (!alert.payload) { this.alerts = []; return; }
      this.alerts.push(alert);
      if (alert.ttl !== Infinity) {
        this.timers.push(new AlertTimeout(() => this.removeAlert(alert), alert.ttl));
      }
    });

  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  alertClass(alert: Alert) {
    if (!alert) { return; }

    switch (alert.type) {
      case AlertType.Danger:
        return 'alert-danger';
      case AlertType.Info:
        return 'alert-info';
      case AlertType.Success:
        return 'alert-success';
    }
  }

}
