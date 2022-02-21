import { Router} from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import customerRouter from '@modules/customers/infra/http/routes/customers.routes';
import orderRouter from '@modules/orders/infra/http/routes/orders.routes';


const routes = Router();


routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);


export default routes;
