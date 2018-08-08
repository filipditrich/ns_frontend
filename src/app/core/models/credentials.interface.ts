export interface ICredentials {
  username: string;
  password: string;
}


/**
 * Registration related interfaces
 */
export interface IRegistrationRequest {
  email: string;
  name: string;
}

export interface IRegistrationCredentials {
  username: string;
  password: string;
  team: string;
}
