import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../infra/typeorm/entities/Order";
import OdersRepository from "../infra/typeorm/repositories/OrdersRepository";


interface IRequest {
  id: string
}

class ShowOrderService {
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
