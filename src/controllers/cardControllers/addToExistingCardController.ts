import { Request, Response } from 'express';
import addToExistingContactService from '../../services/cardServices/addToExistingContactService';
import { StatusCodes } from 'http-status-codes';

const addToExistingContactController = async (req: Request, res: Response) => {
  const { parent_card_id, ...cardData } = req.body;

  if (!parent_card_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'Parent Card Id Not Received',
      data: {},
    });
  }

  try {
    //calls the addToExistingContactService
    const returnedValue = await addToExistingContactService(
      parent_card_id,
      cardData,
    );

    if (returnedValue.status == true) {
      return res.status(StatusCodes.OK).json({ ...returnedValue });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ ...returnedValue });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, message: error, data: {} });
  }
};

export default addToExistingContactController;
