import { Router} from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import customerRouter from '@modules/customers/routes/customers.routes';
import orderRouter from '@modules/orders/routes/orders.routes';


const routes = Router();


routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);


export default routes;
