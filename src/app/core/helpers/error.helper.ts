import { environment } from '../../../environments/environment';
import { AlertsService } from '../services/alerts/alerts.service';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHelper {

  constructor(private alertsService: AlertsService,
              private router: Router) {  }

  handleGenericError(err) {
    const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;

    if (err.status === 0) {

      this.alertsService.alertDanger({
        title: 'Servers Unreachable',
        body: 'We couldn\'t establish a connection between client and server. Please contact application administrator'
      });

    } else {
      switch (error.status) {
        case 404: {
          this.alertsService.alertDanger({
            title: 'Request not found',
            body: 'The requested endpoint was not found. Please contact the administrator.'
          }, 7500);
          break;
        }
        default: {
          this.alertsService.alertDanger({
            title: error.name,
            body: !!error.message ? error.message : (!!error.stack && !environment.production) ? error.stack : null
          }, 7500);
          break;
        }
      }
    }

  }

  processedButFailed(response) {
    this.alertsService.alertDanger({
      title: !!response.response.name ? response.response.name : 'Error',
      body: !!response.response.message ? response.response.message : 'The request processed successfully, but the response failed.'
    }, 5000);
  }

}
