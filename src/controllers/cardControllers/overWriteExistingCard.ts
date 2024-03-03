import { Request, Response } from 'express';
import getCardDetailsService from '../../services/cardServices/getCardDetailsService';
import { editCardService } from '../../services/cardServices/editCardService';
import { StatusCodes } from 'http-status-codes';
import sharedCardAcceptService from '../../services/cardServices/sharedCardAcceptService';

const overWriteExistingCard = async (
  req: Request,
  res: Response<responseType>,
) => {
  const responseData: responseType = {
    status: false,
    message: '',
    data: {},
  };
  try {
    const { shared_card_id, card_to_overWrite, user_id } = req.body;

    if (!shared_card_id || !card_to_overWrite) {
      responseData.message = 'Not all necessary parameters passed';
      return res.status(StatusCodes.BAD_REQUEST).json(responseData);
    }

    const foundCardDetails = await getCardDetailsService(shared_card_id, false);

    if (foundCardDetails.status == true) {
      const editCardStatus = await editCardService(
        card_to_overWrite,
        user_id,
        foundCardDetails.data,
      );
      console.log('editcard STATUS :', editCardStatus);
      if (editCardStatus == 1) {
        const acceptCard = await sharedCardAcceptService(
          shared_card_id,
          user_id,
          card_to_overWrite,
        );

        if (acceptCard.status == true) {
          responseData.status = true;
          responseData.message = 'Overwrite is successful';
          return res.status(StatusCodes.OK).json(responseData);
        } else {
          responseData.message = 'Error updating the card';
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(responseData);
        }
      } else {
        responseData.message = 'Error updating the card';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseData);
      }
    } else {
      responseData.message = 'Card You Shared couldnt be found';
      return res.status(StatusCodes.NOT_FOUND).json(responseData);
    }
  } catch (error) {
    responseData.message = 'Internal Server Error';
    responseData.data = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseData);
  }
};

export default overWriteExistingCard;
