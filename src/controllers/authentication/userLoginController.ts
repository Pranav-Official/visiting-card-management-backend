import { Request, Response } from 'express';
import userLoginService from '../../services/authentication/userLoginService';

const userLoginController = async (req: Request, res: Response) => {
  const { user_email, password } = req.body;

  if (!user_email || !password) {
    return res.status(402).json({ error: 'Please Enter All the Details' });
  }

  try {
    //calls the userRegistrationService
    const returnedValue = await userLoginService(user_email, password);

    if (returnedValue.status == true) {
      return res.status(200).json({
        token: returnedValue.token,
        message: 'User logged in successfully',
      });
    } else {
      return res.status(401).json({ message: returnedValue.message });
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

export default userLoginController;
