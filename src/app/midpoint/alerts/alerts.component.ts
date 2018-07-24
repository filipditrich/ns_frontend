import { Component, OnInit, Input } from '@angular/core';
import {AlertsService} from './alerts.service';
import {Alert, AlertType} from './alerts.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ns-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  @Input() id: string;
  alerts: Alert[] = [];

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {

    this.alertsService.getAlert(this.id).subscribe((alert: Alert) => {
      if (!alert.payload) { this.alerts = []; return; }
      this.alerts.push(alert);
      if (alert.ttl !== Infinity) {
        setTimeout(() => {
          this.removeAlert(alert);
        }, alert.ttl);
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
