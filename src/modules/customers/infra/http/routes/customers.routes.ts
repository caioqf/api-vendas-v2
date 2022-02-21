import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import Router from 'express';
import CustomersController from '../controllers/CustomersController';


const customersRouter = Router();

const customerController = new CustomersController;


customersRouter.get('/', customerController.index);

customersRouter.get(
  '/:id',
  celebrate({
        [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customerController.show
)

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    }
  }),
  customerController.create
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
    }
  }),
  customerController.update
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customerController.delete
);

export default customersRouter;
