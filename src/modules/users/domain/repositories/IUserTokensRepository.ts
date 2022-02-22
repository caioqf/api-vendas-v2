import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

export interface IUserTokensRepository {

  findByToken(token: string): Promise<UserToken | undefined>
  generate(token: string): Promise<UserToken | undefined>
}
