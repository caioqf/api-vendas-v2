import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';
import AppError from '@shared/errors/AppError';


let fakeUserRepository: FakeUserRepository
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  
  beforeEach(() => {
    
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider;
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

  })

  it('should be able to create a new user', async () => {

    const hashPass = await fakeHashProvider.generateHash('1746');

    const  newUser = await createUser.execute({
      name: 'douglas',
      email: 'douglas@gmail.com',
      password: hashPass 
    })
    expect(newUser).toHaveProperty('id')
  })

  it('should not be able to create a new user with existent email', async () => {
    
    const hashPass = await fakeHashProvider.generateHash('1746');
    
      await createUser.execute({
        name: 'douglas',
        email: 'douglas@gmail.com',
        password: hashPass 
      })

    await expect(
        createUser.execute({
          name: 'douglas',
          email: 'douglas@gmail.com',
          password: hashPass 
      })
    )
    .rejects.toBeInstanceOf(AppError);
  })
})
