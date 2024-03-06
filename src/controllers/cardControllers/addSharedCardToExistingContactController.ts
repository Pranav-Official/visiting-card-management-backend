import { Request, Response } from 'express';
import addSharedCardToExistingContactService from '../../services/cardServices/addSharedCardToExistingContactService';
import { StatusCodes } from 'http-status-codes';

const addToExistingContactController = async (req: Request, res: Response) => {
  const { user_id, shared_card_id, parent_card_id } = req.body;

  if (!user_id || !shared_card_id || !parent_card_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'Necessary Details Not Found!!!',
      data: {},
    });
  }

  try {
    //calls the Add Shared Card to Existing Contacts Service
    const returnedValue = await addSharedCardToExistingContactService(
      user_id,
      shared_card_id,
      parent_card_id,
    );

    if (returnedValue.status == true) {
      return res.status(StatusCodes.OK).json({ ...returnedValue });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ ...returnedValue });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'An error occurred while adding the card.' + error,
      data: {},
    });
  }
};

export default addToExistingContactController;
