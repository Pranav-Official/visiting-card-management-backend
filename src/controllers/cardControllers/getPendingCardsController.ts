import { Request, Response } from "express";
import getPendingCardsService from "../../services/cardServices/getPendingCardService";

//Controller to get pending card list

const getPendingCardsController = async(req: Request, res: Response): Promise<any> => {

  try {
    const userId = req.query.userId as string;
    const pendingCardsDetails = await getPendingCardsService(userId);

    if (pendingCardsDetails.hasPendingCards) {
      return res.json(pendingCardsDetails);
    } else {
      return res.json({ message: 'No pending cards for the user.' });
    }

  } catch (error) {
    console.error('Error in cards controller:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

  export default getPendingCardsController;