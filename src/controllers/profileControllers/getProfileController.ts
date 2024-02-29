import { Request, Response } from 'express';
import getProfileService from '../../services/profile/getProfileService';
import { StatusCodes } from 'http-status-codes';

// Controller for fetching profile data
const getProfileController = async (
  req: Request,
  res: Response<responseType>,
) => {
  const responseBody: responseType = {
    status: false,
    message: '',
    data: {},
  };
  try {
    // Extracting user_id from the request query
    const user_id = req.query.user_id as string;

    if (!user_id) {
      responseBody.status = false;
      responseBody.message = 'Please provide all the necessary credentials';
      return res.status(StatusCodes.BAD_REQUEST).json(responseBody);
    }

    // Calling the service function to retrieve profile details
    const profileDetails = await getProfileService(user_id);

    // Returning profile details in the response if successful
    if (profileDetails.status === true) {
      responseBody.status = true;
      responseBody.message = 'Profile details found';
      responseBody.data = profileDetails.data;
      return res.status(StatusCodes.OK).json(responseBody);
    } else {
      responseBody.message = 'Profile details not found';
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

export default getProfileController;
