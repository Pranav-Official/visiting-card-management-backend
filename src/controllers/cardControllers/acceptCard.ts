import { Request, Response } from "express";
import acceptCardService from "../../services/cardServices/acceptCardService";

const acceptCardController = async (req: Request, res: Response) => {
  try {
    const {cardData} = req.body;
    const acceptedCards = await acceptCardService(cardData);

    if (acceptedCards) {
      return res.status(200).json({ message: 'Card accepted successfully', acceptedCards });
    } else {
      console.error('Error accepting card');
      return res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default acceptCardController;
