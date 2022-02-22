import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateSessionService from '../CreateSessionsService';


let fakeUserRepository: FakeUserRepository
let createSession: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  
  beforeEach(() => {
    
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider;
    createSession = new CreateSessionService(fakeUserRepository, fakeHashProvider);

  })

  it('should be able to authenticate', async () => {

   const user = await fakeUserRepository.create({
      name: 'douglas',
      email: 'douglas@gmail.com',
      password: '12345' 
    });

    const session = await createSession.execute(user)
    
    expect(session).toHaveProperty('token');
  })

  // it('should not be able to create a new user with existent email', async () => {
    
  //   const hashPass = await fakeHashProvider.generateHash('1746');
    
  //     await fakeUserRepository.create({
  //       name: 'douglas',
  //       email: 'douglas@gmail.com',
  //       password: hashPass 
  //     })

  //   expect(
  //     fakeUserRepository.create({
  //         name: 'douglas',
  //         email: 'douglas@gmail.com',
  //         password: hashPass 
  //     })
  //   )
  //   .rejects.toBeInstanceOf(AppError);
  // })
})
