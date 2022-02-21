import Router from 'express';
import passwordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import { randomUUID } from 'crypto';


const passwordRouter = Router();
const forgotPasswordController = new passwordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
    celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      }
    }),
  resetPasswordController.create,
);

export default passwordRouter;
