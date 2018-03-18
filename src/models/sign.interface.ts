import { UserInfo } from '../models/userinfo.interface';

export interface Sign{
  token: string,
  user: UserInfo
}
