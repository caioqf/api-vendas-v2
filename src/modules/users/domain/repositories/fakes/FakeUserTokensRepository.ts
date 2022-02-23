import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import { IUserToken } from "../../models/IUserToken";


export default class FakeUserTokensRepository implements IUserTokensRepository {

    private tokens: IUserToken[] = []

    public async findByToken(token: string): Promise<IUserToken | undefined> {

        const tokenFound = this.tokens.find(o => o.token === token)

        return tokenFound;
    }

    public async generate(user_id: string): Promise<IUserToken > {
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
