import { UserRoles } from '../enums/user.enum';

export interface IUser {
  _id: string;
  username: string;
  token?: string;
  name: string;
  email: string;
  roles: UserRoles;
}
