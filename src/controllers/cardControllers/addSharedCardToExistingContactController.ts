import { Request, Response } from 'express';
import addSharedCardToExistingContactService from '../../services/cardServices/addSharedCardToExistingContactService';

const addToExistingContactController = async (req: Request, res: Response) => {
  const { user_id, shared_card_id, parent_card_id } = req.body;

  if (!user_id || !shared_card_id || !parent_card_id) {
    return res.status(402).json({ error: 'Necessary Details Not Found!!!' });
  }

  try {
    //calls the Add Shared Card to Existing Contacts Service
    const returnedValue = await addSharedCardToExistingContactService(
      user_id,
      shared_card_id,
      parent_card_id,
    );

    if (returnedValue.status == true) {
      return res.status(200).json({ ...returnedValue });
    } else {
      return res.status(400).json({ ...returnedValue });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'An error occurred while adding the card.' + error });
  }
};

export default addToExistingContactController;
