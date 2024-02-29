import { Request, Response } from 'express';
import acceptCardService from '../../services/cardServices/acceptCardService';
import { StatusCodes } from 'http-status-codes';

const acceptCardController = async (req: Request, res: Response) => {
  try {
    const { card_id, user_id, contact_name } = req.body;
    //console.log(cardData, card_id);

    if (!card_id || !user_id || !contact_name) {
      console.error('Missing required parameters');
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const acceptedCards = await acceptCardService({
      card_id,
      user_id,
      contact_name,
    });

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
      .json({ status: false, message: 'Internal server error', data: error });
  }
};

export default acceptCardController;
