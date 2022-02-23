import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";


export default class FakeUserTokensRepository implements IUserTokensRepository {

    private tokens: UserToken[] = []

    public async findByToken(token: string): Promise<UserToken | undefined> {

        const tokenFound = this.tokens.find(o => o.token === token)

        return tokenFound;
    }

    public async generate(user_id: string): Promise< UserToken> {
        const token = {
            id: 'id',
            token: 'token',
            user_id: user_id,
            createdAt: new Date,
            updatedAt: new Date,
        }

        this.tokens.push(token);

        return token;

    }
}
