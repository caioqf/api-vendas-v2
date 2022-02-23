import FakeUserRepository from "@modules/users/domain/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "@modules/users/providers/fakes/FakeHashProvider";
import CreateUserService from "../CreateUserService";
import DeleteUserService from "../DeleteUserService";
import AppError from "@shared/errors/AppError";

describe('DeleteUser', () => {

    let fakeHashProvider: FakeHashProvider;
    let fakeUserRepository: FakeUserRepository;
    let deleteUser: DeleteUserService;
    let createUser: CreateUserService;

    beforeEach(() => {
      
        fakeHashProvider = new FakeHashProvider;
        fakeUserRepository = new FakeUserRepository;
        deleteUser = new DeleteUserService(fakeUserRepository);
        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    })


    it('shoul be able to delete a existent user', async () => {
        const user = await createUser.execute({
            name: 'douglas',
            email: 'douglas@gmail.com',
            password: '1234' 
          })
        
        const deleted = deleteUser.execute({
            id: user.id
        });

        expect(deleted).resolves.not.toThrow()
    })

    it('should not be able to delete an inexistent user', async () => {
        expect(
            deleteUser.execute({
                id: 'inexistent_ID'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})