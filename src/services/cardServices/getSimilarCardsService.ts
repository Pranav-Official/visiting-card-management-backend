import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Cards from '../../models/cards';

//function to get similar cards list
const getSimilarCardsService = async (req: Request, res: Response) => {
  try {
    const { user_id, card_name, phone, email } = req.body;
    if (!user_id) {
      return res.status(400).json('User not found');
    }
    //finding similar cards in the user's contacts (checks any one of the scanned details are matching).
    const contacts = await Cards.findAll({
      where: {
        [Op.or]: [
          { card_name: card_name },
          { contact_name: card_name },
          { phone: phone },
          { email: email },
        ],
        user_id: user_id,
      },
      attributes: ['card_id', 'contact_name', 'card_name', 'email', 'phone'],
    });

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(401).json('Cannot return contact list');
  }
};

export default getSimilarCardsService;
