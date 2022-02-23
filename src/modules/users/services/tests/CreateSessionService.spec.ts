import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateSessionService from '../CreateSessionsService';
import { rejects } from 'assert';


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
    expect(session.user).toEqual(user);
  })

  it('should not be able to create a new session with inexistent user', async () => {
    
    expect(
      createSession.execute({
        email: 'notDouglas@gmail.com',
        password: 'wrongpass'
      })
    )
    .rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to create a new session wrong password', async() => {
    
    const user = await fakeUserRepository.create({
      name: 'douglas',
      email: 'douglas@gmail.com',
      password: '1746' 
    })

    expect(
      createSession.execute({
        email: 'douglas@gmail.com',
        password: '1111',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
