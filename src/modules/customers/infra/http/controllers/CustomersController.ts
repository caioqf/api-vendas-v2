import { Request, Response } from "express";
import CreateCustomerService from "../../../services/CreateCustomerService";
import DeleteCustomerService from "../../../services/DeleteCustomerService";
import ListCustomerService from "../../../services/ListCustomerService";
import ShowCustomerService from "../../../services/ShowCustomerService";
import UpdateCustomerService from "../../../services/UpdateCustomerService";
import { container } from 'tsyringe';

export default class CustomersController {

  public async index(req: Request, res: Response): Promise<Response>{
    
    const listCustomers = container.resolve(ListCustomerService)

    const customers = await listCustomers.execute();
    
    return res.json(customers)
  } 

  //Delete one customer
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;  
    
    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({id});

    return res.json([])
  }

  //Create one customer
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ 
      name, 
      email,
    });

    return res.json(customer);
  }

  //Show single customer
  public async show(req: Request, res: Response): Promise<Response> {
    const showCustomer = container.resolve(ShowCustomerService);
    const id = req.params.id;
    
    // console.log(customer_id);
    const customer = await showCustomer.execute({id});

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email} = req.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const updatedCustomerResponse = await updateCustomer.execute({id, name, email});

    return res.json(updatedCustomerResponse)
  }

}



