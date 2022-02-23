import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';
import ShowUserService from '../ShowUserService';
import AppError from '@shared/errors/AppError';


describe('ShowUser', () => {
  
  let fakeUserRepository: FakeUserRepository;
  let fakeHashProvider: FakeHashProvider;
  let createUser: CreateUserService;
  let showUser: ShowUserService;

  beforeEach(() => {
    
    fakeHashProvider = new FakeHashProvider;
    fakeUserRepository = new FakeUserRepository;
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)
    showUser = new ShowUserService(fakeUserRepository);
  })

  it('should be able to show information of a single user', async () => {

    const user = await createUser.execute({
      name: 'douglas',
      email: 'douglas@gmail.com',
      password: '1746' 
    })

    const userShow = await showUser.execute({
      id: user.id
    })

    expect(userShow).rejects
    expect(userShow.name).toBe(user.name)
    expect(userShow.email).toBe(user.email)
  })
  
  it('should not be able to show a inexistent user', async () => {
  
    expect(
      showUser.execute({
        id: 'inexistent'
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
