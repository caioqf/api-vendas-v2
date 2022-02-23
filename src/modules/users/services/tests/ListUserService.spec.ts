import 'reflect-metadata';
import AppError from "@shared/errors/AppError";
import CreateUserService from "../CreateUserService";
import ListUserService from "../ListUserService";
import FakeHashProvider from "@modules/users/providers/fakes/FakeHashProvider";
import FakeUserRepository from "@modules/users/domain/repositories/fakes/FakeUserRepository";
import User from '@modules/users/infra/typeorm/entities/User';


describe('ListUser', () => {

    let fakeHashProvider: FakeHashProvider;
    let fakeUserRepository: FakeUserRepository;
    let listUser: ListUserService;
    let createUser: CreateUserService; 

    beforeEach(() => {
        
        fakeHashProvider = new FakeHashProvider;
        fakeUserRepository = new FakeUserRepository;
        listUser = new ListUserService(fakeUserRepository)
        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    })

    it('shoul be able to list all registred users', async () => {

        await createUser.execute({
            name: 'douglas',
            email: 'douglas@gmail.com',
            password: '1234' 
          })

        const list = listUser.execute()
        expect(list).resolves
    });
    //There is no case where it doesn't return anything or throw's
    //a error instance. It will allways return, even a blank object.
})