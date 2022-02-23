import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/domain/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import ResetPasswordService from '../ResetPasswordService';
import CreateUserService from '../CreateUserService';
import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { resolve } from 'path/posix';


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

    it('should not be able to reser password when provided a inexistent token', async () => {
      
      const user = await createUser.execute({
        name: 'douglas',
        email: 'douglas@gmail.com',
        password: '1234' 
      })

      expect(
        resetPassword.execute({
          password: '4321',
          token: {
            id: '21313',
            token: 'asdfa',
            user_id: 'afaff',
            createdAt: new Date,
            updatedAt: new Date,
          },
        })
      ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset the password when provided an inexistent user', async () => {
      
      const user = await fakeUserRepository.findById('douglas');

      expect(user).toBe(undefined)
    })

    it('should not be able to reset when the token is expired', async () => {
      
      const user = await createUser.execute({
        name: 'douglas',
        email: 'douglas@gmail.com',
        password: '1234' 
      })
      
      const token = await fakeUserTokensRepository.generate(user.id);    
      token.createdAt = new Date('2022-02-22');

      expect(
         resetPassword.execute({
          password: '4321',
          token: token,
      })
      ).rejects.toBeInstanceOf(AppError); 
    })
})
