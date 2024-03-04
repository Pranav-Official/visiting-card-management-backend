import { Request, Response } from 'express';
import userRegistrationService from '../../services/authentication/userRegistrationService';
import { validateEmail } from '../../utils/regexChecks';
import { StatusCodes } from 'http-status-codes';

const userResgistrationController = async (
  req: Request,
  res: Response<responseType>,
) => {
  const { user_fullname, user_email, password } = req.body;

  if (!user_fullname || !user_email || !password) {
    return res.status(400).json({
      status: false,
      message: 'Please Enter All the Details',
      data: {},
    });
  }

  const emailValidity = validateEmail(user_email);
  if (!emailValidity) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'Please Enter a Valid Email',
      data: {},
    });
  }

  try {
    //calls the userRegistrationService
    const userRegistrationStatus = await userRegistrationService(
      user_fullname,
      user_email,
      password,
    );

    if (userRegistrationStatus.status === true) {
      return res.status(StatusCodes.OK).json(userRegistrationStatus);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(userRegistrationStatus);
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'user registration failed' + error,
      data: {},
    });
  }
};

export default userResgistrationController;
