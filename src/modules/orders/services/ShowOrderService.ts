import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import Order from "../infra/typeorm/entities/Order";
import OdersRepository from "../infra/typeorm/repositories/OrdersRepository";


interface IRequest {
  id: string
}

@injectable()
class ShowOrderService {

  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository ){}
  
    public async execute({id}: IRequest): Promise<Order> {
    const odersRepository = getCustomRepository(OdersRepository);

    const order = await odersRepository.findById(id);

    if (!order){
      throw new AppError('Order not found');
    }
    
    return order;
  }
}

export default ShowOrderService;
