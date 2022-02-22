import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";


export default class UserTokensRepository implements IUserTokensRepository {

    private ormRepository: Repository<UserToken>

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: {
                token,
            }
        });
        return userToken;
    }

    public async generate(user_id: string): Promise< UserToken> {
        const token = await this.ormRepository.create({
            user_id,
        })

        await this.ormRepository.save(token)

        return token;
    }
}
