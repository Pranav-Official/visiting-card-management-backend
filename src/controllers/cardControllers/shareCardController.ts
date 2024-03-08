import shareCardService from '../../services/cardServices/shareCardService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const shareCardController = async (req: Request, res: Response<responseType>) => {
  try {
    const { card_id, receiver_user_ids } = req.body;
    
    if (!card_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ status: false, message: 'Card ID not found in request body', data: {} });
    } else if (!Array.isArray(receiver_user_ids) || receiver_user_ids.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ status: false, message: 'Receiver User IDs must be provided as an array', data: {} });
    }

    // Call shareCardService with card_id and receiver_user_ids only
    const shareCardResponse = await shareCardService(card_id, receiver_user_ids);

    if (shareCardResponse.status) {
      return res.status(StatusCodes.OK).json(shareCardResponse);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(shareCardResponse);
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, message: 'Internal server error', data: error });
  }
};

export default shareCardController;








