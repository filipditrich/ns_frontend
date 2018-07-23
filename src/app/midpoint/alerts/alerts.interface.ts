export class Alert {
  id: string;
  type: AlertType;
  payload: AlertPayload;
  persistent: boolean;
  ttl: number;
  redirectUrl: string;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }

}

export class AlertPayload {
  title?: string;
  body: string;
}

export enum AlertType {
  Success,
  Danger,
  Info
}
