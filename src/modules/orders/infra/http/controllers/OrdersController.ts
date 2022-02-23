import { Request, Response } from "express";
import ShowOrderService from '../../../services/ShowOrderService';
import CreateOrderService from '../../../services/CreateOrderService';
import { container } from "tsyringe";

export default class OrdersController {

  public async create(req: Request, res: Response): Promise<Response> {
    
    const createOrder = container.resolve(CreateOrderService);

    const { products, customer_id} = req.body;

    const order = await createOrder.execute({
      products,
      customer_id
    })


    return res.status(200).json(order)

  }

  public async show(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id })

    return res.status(200).json(order)
  }
}
