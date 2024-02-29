

import shareCardService from '../../services/cardServices/shareCardService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const shareCardController = async (req: Request, res: Response) => {
  try {
    const card_id = req.query.card_id as string;
    const receiver_user_id = req.query.receiver_user_id as string;
    if(!card_id ){
      return res.status(StatusCodes.BAD_REQUEST).json('Card ID not found in request body')
    }
    else if(!receiver_user_id){
      return res.status(StatusCodes.BAD_REQUEST).json('Receiver User ID not found in request body')
    }
    else{
    const shareCard = await shareCardService(card_id, receiver_user_id); //To pass the card_id and user_id to sharedCardService
    if (shareCard.status) {
      return res.status(StatusCodes.OK).json(shareCard);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json(shareCard);
    }}
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export default shareCardController;
