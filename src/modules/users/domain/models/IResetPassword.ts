import { IUserToken } from "./IUserToken";

export interface IResetPassword {
    token: IUserToken;
    password: string;
}
