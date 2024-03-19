import { Request, Response } from 'express';
import userLoginService from '../../services/authentication/userLoginService';
import { validateEmail } from '../../utils/regexChecks';
import { StatusCodes } from 'http-status-codes';

const userLoginController = async (req: Request, res: Response) => {
  const { user_email, password } = req.body;

  if (!user_email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'Please Enter All the Details',
      data: [],
    });
  }

  const emailValidity = validateEmail(user_email);
  if (!emailValidity) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'Please Enter a Valid Email',
      data: [],
    });
  }

  try {
    //calls the userRegistrationService
    const returnedValue = await userLoginService(user_email, password);

    if (returnedValue.status == true) {
      return res.status(StatusCodes.OK).json(returnedValue);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json(returnedValue);
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error.message || 'Internal server error',
      data: [],
    });
  }
};

export default userLoginController;
