import { Request, Response } from 'express';
import acceptCardService from '../../services/cardServices/acceptCardService';
import { StatusCodes } from 'http-status-codes';
import { error } from 'console';

const acceptCardController = async (req: Request, res: Response<responseType>) => {
  try {
    const { card_id, user_id, contact_name } = req.body;

    if (!card_id || !user_id || !contact_name) {
      console.error('Missing required parameters');
      return res.status(StatusCodes.BAD_REQUEST).json({ status: false, message:'Missing required parameters',data:error });
    }

    const acceptedCards = await acceptCardService({
      card_id,
      user_id,
      contact_name,
    }) as responseType;

    if (acceptedCards.status) {
      return res.status(StatusCodes.OK).json(acceptedCards);
    } else {
      console.error('Error accepting card');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(acceptedCards);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: 'Internal server error', data: error.message });
  }
};

export default acceptCardController;
