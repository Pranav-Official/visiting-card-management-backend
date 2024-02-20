import { Request, Response } from 'express';
import Cards from '../../models/cards';

//function to get complete contact list in home page
const getContactListService = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      res.status(400).json('user_id missing');
    }
    const list = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      attributes: ['card_name', 'ph'],
    });
    return res.status(200).json(list);
  } catch (error) {
    return res.status(401).json('Cannot return contact list');
  }
};

export default getContactListService;
