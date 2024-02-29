
import deleteCardService from '../../services/cardServices/deleteCardService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const deleteCardController = async (req: Request, res: Response) => {
  try {
    const card_id = req.body.card_id as string;
    if(!card_id){
      return res.status(StatusCodes.BAD_REQUEST).json('Card ID not found in request body')
    }
    else{
    const deleteCard = await deleteCardService(card_id);
    if (deleteCard.status) {
      return res.status(StatusCodes.OK).json(deleteCard);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json(deleteCard);
    }}
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export default deleteCardController;
