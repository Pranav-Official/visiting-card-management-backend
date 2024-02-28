import { Request, Response } from 'express';
import getSimilarCardsService from '../../services/cardServices/getSimilarCardsService';
import { StatusCodes } from 'http-status-codes';

// Controller function for handling requests to find similar cards
const getSimilarCardsController = async (
  req: Request,
  res: Response<responseType>,
) => {
  const responseBody: responseType = {
    status: false,
    message: '',
    data: {},
  };
  try {
    const { user_id, card_name, phone, email } = req.query as {
      user_id: string;
      card_name: string;
      phone: string;
      email: string;
    };

    // Checking if required parameters are missing
    if (!user_id && !card_name && !phone && !email) {
      responseBody.status = false;
      responseBody.message = 'Please provide all the necessary credentials';
      return res.status(StatusCodes.BAD_REQUEST).json(responseBody);
    }

    // Calling the service to retrieve similar card details
    const similarCardDetails = await getSimilarCardsService(
      user_id,
      card_name,
      phone,
      email,
    );

    // Sending the similar card details in the response if successful
    if (similarCardDetails.status === true) {
      responseBody.status = true;
      responseBody.message = 'Similar cards found';
      responseBody.data = similarCardDetails.data;
      return res.status(StatusCodes.OK).json(responseBody);
    } else {
      responseBody.status = false;
      responseBody.message = 'No similar cards found';
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

export default getSimilarCardsController;
