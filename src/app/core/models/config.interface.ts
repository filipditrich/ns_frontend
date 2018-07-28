import { IResponse } from './response.interface';
import { UserRoles } from '../enums/user.enum';
import { Method } from '../enums/method.enum';

export interface IResource {
  response: IResponse;
  codes?: ICode | ICode[];
  endpoints?: IEndpoint | IEndpoint[];
}

export interface IEndpoint {
  id: string;
  endpoint: string;
  url?: string;
  meta?: IEndpointMeta;
}

export interface IEndpointMeta {
  method: Method;
  authorization: UserRoles;
}

export interface ICode {
  name: string;
  message?: string;
  status: number;
  success: boolean;
}
