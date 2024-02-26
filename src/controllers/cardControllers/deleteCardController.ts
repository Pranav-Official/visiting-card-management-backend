import deleteCardService from '../../services/cardServices/deleteCardService';
import { Request, Response } from 'express';

const deleteCardController = async (req: Request, res: Response) => {
  try {
    const card_id = req.body.card_id as string;

    const deleteCard = await deleteCardService(card_id);
    if (deleteCard.status) {
      return res.status(200).send(deleteCard);
    } else {
      return res.status(404).json(deleteCard);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default deleteCardController;
