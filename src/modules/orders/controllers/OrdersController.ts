import { Request, Response } from "express";
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

export default class OrdersController {

  public async create(req: Request, res: Response): Promise<Response> {
    
    const createOrder = new CreateOrderService;

    const { products, customer_id} = req.body;

    const order = await createOrder.execute({
      products,
      customer_id
    })


    return res.status(200).json(order)

  }

  public async show(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params

    const showOrder = new ShowOrderService;

    const order = await showOrder.execute({ id })

    return res.status(200).json(order)
  }
}
