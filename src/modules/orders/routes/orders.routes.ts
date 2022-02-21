import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import Router from 'express';
import OrdersController from '../controllers/OrdersController';

const orderRouter = Router();
const orderController = new OrdersController;


orderRouter.get(
  '/:id',
   celebrate({
     [Segments.PARAMS]: {
       id: Joi.string().uuid().required(),
     }
   }),
  orderController.show
);

orderRouter.post(
  '/',
   celebrate({
     [Segments.BODY]: {
      products: Joi.required(),
      customer_id: Joi.string().uuid().required(),
     }
   }),
  orderController.create
);


export default orderRouter;
