import { Request, Response } from 'express';
import Cards from '../../models/cards';

//Function to create a new card
const createNewCardService = async (req: Request, res: Response) => {
  try {
    const {
      card_name,
      img_front_link,
      img_back_link,
      job_title,
      email,
      phone,
      company_name,
      company_website,
      //description,
      contact_name,
      //parent_card_id,
      user_id,
      //shared_or_not
    } = req.body;

    if (card_name && email && phone) {
      const createCard = await Cards.create(
        {
          card_name,
          img_front_link,
          img_back_link,
          job_title,
          email,
          phone,
          company_name,
          company_website,
          description: null,
          contact_name,
          parent_card_id: null,
          user_id,
          shared_or_not: 0,
        },
        { raw: true },
      );
      console.log(`New card created: ${createCard.toJSON()}`);
      return res
        .status(200)
        .json({ message: 'New card creation in successfull' });
    } else {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default createNewCardService;
