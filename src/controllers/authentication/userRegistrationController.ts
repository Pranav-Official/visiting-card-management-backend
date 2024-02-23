import { Request, Response } from 'express';
import userRegistrationService from '../../services/authentication/userRegistrationService';

const userResgistrationController = async (req: Request, res: Response) => {
  const { user_fullname, user_email, password } = req.body;

  if (!user_fullname || !user_email || !password) {
    return res.status(402).json({ error: 'Please Enter All the Details' });
  }

  try {
    //calls the userRegistrationService
    const returnedValue = await userRegistrationService(
      user_fullname,
      user_email,
      password,
    );

    if (returnedValue.status == true) {
      return res.status(200).json(returnedValue);
    } else {
      return res.status(402).json(returnedValue);
    }
  } catch (error) {
    return res.status(402).json({ error: error });
  }
};

export default userResgistrationController;
