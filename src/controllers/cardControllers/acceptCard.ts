import { Request, Response } from "express";
import acceptCardService from "../../services/cardServices/acceptCardService";

const acceptCardController = async (req: Request, res: Response) => {
  try {
   
    const { cardData, card_id } = req.body;
    //console.log(cardData, card_id);
    

    if (!cardData || !card_id) {
      console.error('Missing required parameters');
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const acceptedCards = await acceptCardService({ cardData, card_id });

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
