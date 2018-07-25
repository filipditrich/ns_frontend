export class IResource {
  response: IResponse;
  endpoints?: IEndpoint | IEndpoint[];
  codes?: ICode | ICode[];
}

export class IResponse {
  name: string;
  message?: string;
  status: number;
  success: boolean;
}

export class IEndpoint {
  id: string;
  endpoint: string;
  url?: string;
  meta?: IEndpointMeta;
  // IEndpoint?;
}

export class IEndpointMeta {
  method: string; // Todo ?
  authorization: string; // Todo urole enum?
}

export class ICode {
  name: string;
  message?: string;
  status: number;
  success: boolean;
}
