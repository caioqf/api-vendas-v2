import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserService";
import DeleteUserService from "../../../services/DeleteUserService";
import ListUserService from "../../../services/ListUserService";
import ShowUserService from "../../../services/ShowUserService";
import UpdateUserService from "../../../services/UpdateUserService";
import { container } from "tsyringe";


export default class UsersController {
  //Get all users
  public async index(req: Request, res: Response): Promise<Response>{
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();
    
    return res.json(users)
  } 

  //Delete one user
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;  
    
    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({id});

    return res.json([])
  }

  //Create one user
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ 
      name, 
      email, 
      password
    });

    return res.json(user);
  }

  //Show single user
  public async show(req: Request, res: Response): Promise<Response> {

    const showUser = container.resolve(ShowUserService);
    const id = req.user.id;
    
    const user = await showUser.execute({ id });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {

    const user_id = req.params.id;
    
    const { name, email, password, old_password } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const updatedUserResponse = await updateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return res.json(updatedUserResponse)
  }

}



