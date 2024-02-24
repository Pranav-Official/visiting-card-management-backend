import { Request, Response } from 'express';
import userLoginService from '../../services/authentication/userLoginService';
import { validateEmail } from '../../utils/regexChecks';

const userLoginController = async (req: Request, res: Response) => {
  const { user_email, password } = req.body;

  if (!user_email || !password) {
    return res.status(402).json({ error: 'Please Enter All the Details' });
  }

  const emailValidity = validateEmail(user_email);
  if (!emailValidity) {
    return res.status(402).json({ error: 'Please Enter a Valid Email' });
  }

  try {
    //calls the userRegistrationService
    const returnedValue = await userLoginService(user_email, password);

    if (returnedValue.status == true) {
      return res.status(200).json(returnedValue);
    } else {
      return res.status(401).json(returnedValue);
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

export default userLoginController;
