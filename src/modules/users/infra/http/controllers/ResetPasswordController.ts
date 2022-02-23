import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordService from "../../../services/ResetPasswordService";


class ResetPasswordController {
    public async create(req: Request, res: Response): Promise<Response>{
      const { token, password } = req.body;
      const resetPassword = container.resolve(ResetPasswordService);

      await resetPassword.execute({
        password,
        token,
      });
    
      return res.status(204).json({})
  }
}

export default ResetPasswordController;
