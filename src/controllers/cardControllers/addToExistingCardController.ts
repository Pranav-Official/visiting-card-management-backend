import { Request, Response } from 'express';
import addToExistingContactService from '../../services/cardServices/addToExistingContactService';

const addToExistingContactController = async (req: Request, res: Response) => {
  const {
    parent_card_id,
    card_name,
    img_front_link,
    img_back_link,
    job_title,
    email,
    phone,
    company_name,
    company_website,
    description,
    user_id,
    shared_or_not,
  } = req.body;

  if (!parent_card_id) {
    return res.status(400).json({ error: 'Parent Card Id Not Received' });
  }

  if (!user_id) {
    return res.status(400).json({ error: 'User ID not Received' });
  }

  try {
    //calls the addToExistingContactService
    const returnedValue = await addToExistingContactService(
      parent_card_id,
      card_name,
      img_front_link,
      img_back_link,
      job_title,
      email,
      phone,
      company_name,
      company_website,
      description,
      user_id,
      shared_or_not,
    );

    if (returnedValue.status == true) {
      return res.status(200).json({ ...returnedValue });
    } else {
      return res.status(400).json({ ...returnedValue });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export default addToExistingContactController;
