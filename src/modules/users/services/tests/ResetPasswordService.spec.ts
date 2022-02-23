import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/domain/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import ResetPasswordService from '../ResetPasswordService';
import CreateUserService from '../CreateUserService';


describe('ResetPassword', () => {
    
    let fakeUserTokensRepository: FakeUserTokensRepository;
    let fakeUserRepository: FakeUserRepository;
    let resetPassword: ResetPasswordService;
    let fakeHashProvider: FakeHashProvider;
    let createUser: CreateUserService;

    beforeEach(() => {

        fakeUserTokensRepository = new FakeUserTokensRepository;
        fakeUserRepository = new FakeUserRepository;
        fakeHashProvider = new FakeHashProvider;
        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        resetPassword = new ResetPasswordService(fakeUserRepository, fakeUserTokensRepository, fakeHashProvider);
        
    })

    it("should be able to reset the user's password", async() => {
        
        const user = await createUser.execute({
            name: 'douglas',
            email: 'douglas@gmail.com',
            password: '1234' 
          })

        const token = await fakeUserTokensRepository.generate(user.id)
        
        await resetPassword.execute({
            password: '4321',
            token: token,
        })

        const pass = user.password;
        
        expect(user.password).toBe('4321')
    })
})
