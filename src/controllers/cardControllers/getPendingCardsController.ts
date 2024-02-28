import { Request, Response } from 'express';
import getPendingCardsService from '../../services/cardServices/getPendingCardService';

//Controller to get pending card list

const getPendingCardsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.query.user_id as string;
    const pendingCardsDetails = await getPendingCardsService(userId);

    if (pendingCardsDetails.hasPendingCards) {
      res.json(pendingCardsDetails);
    } else {
      res.json({
        hasPendingCards: false,
        message: 'No pending cards for the user.',
        pendingCards: [],
      });
    }
  } catch (error) {
    console.error('Error in cards controller:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export default getPendingCardsController;
