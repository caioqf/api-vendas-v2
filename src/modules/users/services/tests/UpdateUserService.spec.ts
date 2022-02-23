import 'reflect-metadata';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import UpdateUserService from '../UpdateUserService';
import CreateUserService from '../CreateUserService';
import AppError from '@shared/errors/AppError';


describe('UpdateUser', () => {
  
  let fakeUserRepository: FakeUserRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateUser: UpdateUserService;
  let createUser: CreateUserService;


  beforeEach(() => {
    
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)
    updateUser = new UpdateUserService(fakeUserRepository, fakeHashProvider);
  })

  it('should be able to update user normal informations', async () => {
    
    const user = await createUser.execute({
      name: 'douglas',
      email: 'douglas@gmail.com',
      password: 'hashPass' 
    })

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'DOUGLAS ALTERADO',
      email: 'douglasALTERADO@gmail.com'
    })
    
    expect(updatedUser).resolves
  })

  it('should be able to update password when all ok', async () => {
    
    const user = await createUser.execute({
      name: 'caio',
      email: 'caio8200@gmail.com',
      password: '1746'
    })
    
    const updated = await updateUser.execute({
      user_id: user.id,
      name: 'caio',
      email: 'caio8200@gmail.com',
      password: '1234',
      old_password: '1746'
    })
    
    expect(updated).resolves;
  })

  it('should not be able to update a inexistent user', async () => {
    
    expect(
       updateUser.execute({
        user_id: 'user.id',
        name: 'DOUGLAS ALTERADO',
        email: 'douglasALTERADO@gmail.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update a user with a email already in use', async () => {
    
    const user1 = await createUser.execute({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: 'hashPass' 
    })
    
    const user2 = await createUser.execute({
      name: 'douglas',
      email: 'douglas@gmail.com',
      password: 'hashPass' 
    })
    
     expect(
      updateUser.execute({
        user_id: user2.id,
        name: 'DOUGLAS ALTERADO',
        email: 'arthur@gmail.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update the password without the old password', async() => {
    
    const user = await createUser.execute({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: 'hashPass' 
    })

    expect(
      updateUser.execute({
        user_id: user.id,
        name: 'DOUGLAS ALTERADO',
        email: 'arthur@gmail.com',
        password: 'new_pass_without_old'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not update the password when the actual pass and the new one doesent match', async () => {

    const user = await createUser.execute({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: 'hashPass' 
    })
    
    expect(
      updateUser.execute({
        user_id: user.id,
        name: 'arthur_alterado',
        email: 'arthur_alterado@gmail.com',
        password: 'new_pass',
        old_password: 'wrong_password'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

})
