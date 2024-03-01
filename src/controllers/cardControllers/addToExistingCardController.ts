import { Request, Response } from 'express';
import addToExistingContactService from '../../services/cardServices/addToExistingContactService';

const addToExistingContactController = async (req: Request, res: Response) => {
  const { ...cardData } = req.body;

  console.log('\n\nCard Data is: ', cardData);

  if (!cardData.parent_card_id) {
    return res.status(400).json({
      status: false,
      message: 'Parent Card Id Not Received',
      data: {},
    });
  }

  try {
    //calls the addToExistingContactService
    const returnedValue = await addToExistingContactService(cardData);

    if (returnedValue.status == true) {
      return res.status(200).json({ ...returnedValue });
    } else {
      return res.status(400).json({ ...returnedValue });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error, data: {} });
  }
};

export default addToExistingContactController;
