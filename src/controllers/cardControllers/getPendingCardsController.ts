import { Request, Response } from 'express';
import getPendingCardsService from '../../services/cardServices/getPendingCardService';
import { StatusCodes } from 'http-status-codes';

//Controller to get pending card list

const getPendingCardsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.query.user_id as string;
    const pendingCardsDetails = await getPendingCardsService(userId);

    if (pendingCardsDetails) {
      res.status(StatusCodes.OK).json(pendingCardsDetails);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(pendingCardsDetails);
    }
  } catch (error) {
    console.error('Error in cards controller:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message || 'Internal Server Error', data: error });
  }
};

export default getPendingCardsController;
