export class ICredentials {
  username: string;
  password: string;
}

export class ILoginResponse {
  response: IResponse;
  token?: string;
  user?: any;
}

export class IResponse {
  name: string;
  status: number;
  success: boolean;
  message?: string;
  stack?: string;
}

export class IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  roles: IUserRoles;
}

export enum IUserRoles {
  admin = 'admin',
  player = 'player'
}

export class IRegReqCredentials {
  email: string;
  name: string;
}

export class IRegCredentials {
  username: string;
  password: string;
  team: string;
}
