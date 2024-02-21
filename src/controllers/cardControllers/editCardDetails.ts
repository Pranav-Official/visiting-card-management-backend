import { Request, Response } from 'express';
import { editCardService } from '../../services/cardServices/editCardService';

const editCardDetails = async (req: Request, res: Response) => {
  try {
    const { card_id, ...updatedCardDetails } = req.body;
    if (card_id) {
      const createCard = await editCardService(card_id, updatedCardDetails);
      if (createCard != 0) {
        return res
          .status(200)
          .json({ message: 'card edit successfull' });
      } else
        return res
          .status(400)
          .json({ message: `Same value already exist in fields` });
    } else return res.status(400).json('Card id is required, but not passed');
  } catch (error) {
    return res.status(500).json({ error: `Internal server error : ${error}` });
  }
};

export default editCardDetails;
