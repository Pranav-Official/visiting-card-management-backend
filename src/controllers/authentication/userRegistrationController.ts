import { Request, Response } from 'express';
import userRegistrationService from '../../services/authentication/userRegistrationService';

const userResgistrationController = async (req: Request, res: Response) => {
  const { user_fullname, user_email, password } = req.body;

  if (!user_fullname || !user_email || !password) {
    return res.status(402).json({ error: 'Please Enter All the Details' });
  }

  try {
    const returnedValue = await userRegistrationService(
      user_fullname,
      user_email,
      password,
    );

    if (returnedValue == true) {
      return res.status(200).json({ message: 'User Registered Successfully' });
    } else {
      return res.status(402).json({ error: 'UNABLE TO CREATE USER!!!' });
    }
  } catch (error) {
    return res.status(402).json({ error: error });
  }
};

export default userResgistrationController;
