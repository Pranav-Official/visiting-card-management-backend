import { Request, Response } from 'express';
import { editCardService } from '../../services/cardServices/editCardService';
import { StatusCodes } from 'http-status-codes';

const editCardDetails = async (req: Request, res: Response<responseType>) => {
  const responseBody: responseType = {
    status: false,
    message: '',
    data: {},
  };
  try {
    const { card_id, user_id, ...updatedCardDetails } = req.body;

    if (card_id) {
      const createCard = await editCardService(
        card_id,
        user_id,
        updatedCardDetails,
      );
      if (createCard == 1) {
        responseBody.status = true;
        responseBody.message = 'card edit successfull';
        return res.status(StatusCodes.OK).json(responseBody);
      } else {
        responseBody.message = 'Error updating card Details';
        return res.status(StatusCodes.BAD_REQUEST).json(responseBody);
      }
    } else {
      responseBody.message = 'Card id is required, but not passed';
      return res.status(StatusCodes.BAD_REQUEST).json(responseBody);
    }
  } catch (error) {
    responseBody.message = 'Internal Server Error';
    responseBody.data = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseBody);
  }
};

export default editCardDetails;
