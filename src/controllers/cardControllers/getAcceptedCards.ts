import { Request, Response } from 'express';
import getAcceptedCardsService from '../../services/cardServices/getAcceptedCardsService';

// /**
//  * Retrieves the accepted cards for a given user and sends the result as a JSON response.
//  *
//  * @param  req - the request object
//  * @param  res - the response object
//  * @return  the response containing the accepted cards
//  */

const getAcceptedCards = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const acceptedCards = await getAcceptedCardsService(user_id);
  if (acceptedCards[0]) {
    return res.status(200).json(acceptedCards);
  }
  return res.status(400).json('No cards found');
};

export default getAcceptedCards;
