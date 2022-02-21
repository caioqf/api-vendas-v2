import { Router } from "express";
import UserController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import AvatarController from "../controllers/AvatarController";
import multer from 'multer';
import uploadConfig from '@config/upload';


const userRouter = Router();
const userContoller = new UserController; 
const avatarController = new AvatarController;

const upload = multer(uploadConfig);


userRouter.get('/', userContoller.index);

userRouter.get(
  '/:id',

isAuthenticated,

celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),
userContoller.show
)

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  }),
  userContoller.create
);

userRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', {
        is: Joi.exist(),
        then: Joi.required()
      }),
      old_password: Joi.string()
    }
  }),
  userContoller.update
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  userContoller.delete
);

//ROTA DE UPDATE DE AVATAR
userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default userRouter;
