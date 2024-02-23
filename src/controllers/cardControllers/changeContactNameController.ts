import { Request, Response } from 'express';
import { editCardService } from '../../services/cardServices/editCardService';

const chnageContactNameController = async (req: Request, res: Response) => {
  try {
    const { card_id, new_contact_name } = req.body;
    if (card_id) {
      const createCard = await editCardService(card_id, {
        contact_name: new_contact_name,
      });
      if (createCard != 0) {
        return res.status(200).json({ message: 'card edit successfull' });
      } else
        return res
          .status(400)
          .json({ message: `Same value already exist in fields` });
    } else return res.status(400).json('Card id is required, but not passed');
  } catch (error) {
    return res.status(500).json({ error: `Internal server error : ${error}` });
  }
};

export default chnageContactNameController;
