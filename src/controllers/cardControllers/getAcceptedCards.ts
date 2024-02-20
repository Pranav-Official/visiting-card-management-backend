import { Request, Response } from 'express';
import getAcceptedCardsService from '../../services/cardServices/getAcceptedCardsService';

const getAcceptedCards = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const acceptedCards = await getAcceptedCardsService(user_id);
  if (acceptedCards) {
    return res.status(200).json(acceptedCards);
  }
  return res.status(400).json('No cards found');
};

export default getAcceptedCards;
