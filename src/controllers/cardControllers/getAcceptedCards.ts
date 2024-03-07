import { Request, Response } from 'express';
import getAcceptedCardsService from '../../services/cardServices/getAcceptedCardsService';
import { StatusCodes } from 'http-status-codes';

// /**
//  * Retrieves the accepted cards for a given user and sends the result as a JSON response.
//  *
//  * @param  req - the request object
//  * @param  res - the response object
//  * @return  the response containing the accepted cards
//  */

const getAcceptedCards = async (req: Request, res: Response) => {
  const user_id = req.query.user_id as string;
  const result = await getAcceptedCardsService(user_id);
  if (result.status) {
    return res.status(StatusCodes.OK).json(result);
  }
  return res.status(StatusCodes.NOT_FOUND).json(result);
};

export default getAcceptedCards;
