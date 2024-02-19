import { Request, Response } from 'express';
import Cards from "../../models/cards";
import SharedCards from "../../models/sharedCards";

const getPendingCardsService = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
       return res.status(400).json({ error: 'User ID is missing in the request.' });
    }

    const pendingCards = await SharedCards.findAll({
      where: { status: 'pending', user_id: userId },
      include: [
        {
          model: Cards,
          attributes: [
          'card_name', 
          'img_front_link', 
          'img_back_link', 
          'job_title', 
          'email', 
          'phone', 
          'company_name', 
          'company_website', 
          'contact_name', 
          'user_id'],
        }
      ],
    });

    return res.json(pendingCards);
  } catch (error) {
    console.error('Error fetching pending cards:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getPendingCardsService;
