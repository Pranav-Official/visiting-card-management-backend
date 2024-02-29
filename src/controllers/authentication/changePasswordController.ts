import { Request, Response } from 'express';
import changePasswordService from '../../services/authentication/changePasswordService';
import { StatusCodes } from 'http-status-codes';

// Controller function for handling requests to change password
const changePasswordController = async (
  req: Request,
  res: Response<responseType>,
) => {
  const responseBody: responseType = {
    status: false,
    message: '',
    data: {},
  };
  try {
    const { email, new_password } = req.body;

    // Checking if any of the required parameters are missing
    if (!email || !new_password) {
      responseBody.status = false;
      responseBody.message = 'Please provide all the necessary credentials';
      return res.status(StatusCodes.BAD_REQUEST).json(responseBody);
    }

    // Calling the service to change password
    const changedPasswordDetails = await changePasswordService(
      email,
      new_password,
    );

    // Sending the changed password details in the response if successful
    if (changedPasswordDetails.status === true) {
      responseBody.status = true;
      responseBody.message = 'Password changed successfully';
      responseBody.data = changedPasswordDetails.data;
      return res.status(StatusCodes.OK).json(responseBody);
    } else {
      responseBody.message = 'Unable to change password';
      return res.status(StatusCodes.NOT_FOUND).json(responseBody);
    }
  } catch (error) {
    console.error('Error:', error);
    responseBody.status = false;
    responseBody.message = error.message;
    responseBody.data = {};
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseBody);
  }
};

export default changePasswordController;
