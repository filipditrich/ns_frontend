export class Dialog {
  id: string;
  type: DialogType;
  payload: DialogPayload;

  constructor(init?: Partial<Dialog>) {
    Object.assign(this, init);
  }

}

export class DialogPayload {
  title: string;
  body: string;
  buttons?: DialogPayloadButtons[];
}

export class DialogPayloadButtons {
  class: string;
  text: string;
  action: any;
}

export enum DialogType {
  Danger,
  Info
}
