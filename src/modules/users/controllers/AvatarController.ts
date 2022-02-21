import { Request, response, Response } from "express";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";


export default class AvatarController {

  public async update(req: Request, res: Response): Promise<Response>{
    const updateAvatar = new UpdateUserAvatarService;
    
    const user = updateAvatar.execute({
      user_id: req.user.id,
      avatar_file: req.file?.filename as string,
    });
    return res.json(instanceToInstance(user));
  }
}

