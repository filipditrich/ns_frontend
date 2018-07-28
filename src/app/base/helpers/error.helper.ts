import {environment} from '../../../environments/environment';
import {AlertsService} from '../alerts/alerts.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHelper {

  constructor(private alertsService: AlertsService) {  }

  handleGenericError(error) {
    error = !!error.error ? !!error.error.response ? error.error.response : error.error : error;

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

  processedButFailed(response) {
    this.alertsService.alertDanger({
      title: !!response.response.name ? response.response.name : 'Error',
      body: !!response.response.message ? response.response.message : 'The request processed successfully, but the response failed.'
    }, 5000);
  }

}
