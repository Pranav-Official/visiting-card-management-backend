import { Request, Response } from 'express';
import Cards from '../../models/cards';

//function to add card to existing contact
const addToExistingContactService = async (req: Request, res: Response) => {
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
    return res
      .status(400)
      .json({ error: 'Necessary Card Details not Received' });
  }

  try {
    const createdCard = await Cards.create({
      card_name,
      img_front_link,
      img_back_link,
      job_title,
      email,
      phone,
      company_name,
      company_website,
      description,
      parent_card_id: parent_card_id,
      user_id,
      shared_or_not,
    });

    if (createdCard) {
      return res.status(200).json({ message: 'Card Added Successfully!!!' });
    }
  } catch (error) {
    return res.status(401).json({ error: "Couldn't Add Card!!!" });
  }
};

export default addToExistingContactService;
