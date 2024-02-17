import { Request, Response } from 'express';
import {Op} from 'sequelize';
import Cards from '../../models/cards';

const getCardList = async (req: Request, res: Response): Promise<Response<any>> => {
    try {
      const { cardId } = req.body;
  
      // Check if the card id is existing in Cards table
      const cardIdFound = await Cards.findOne({ where: { card_id: cardId } });
      if (!cardIdFound) {
        return res.status(404).json({ error: "CardId not found" });
      } else {  //To get cards under a specific contact
         
        const cardList = await Cards.findAll({
          where: {
            [Op.or]: [
              { card_id: cardId },
              { parent_card_id: cardId }
            ]
          },
          attributes: ['card_id','card_name','email', 'phone', 'job_title'],raw:true
        });
     
        // Extracting properties from each card
        const response =cardList.map(card=> ({
          card_id: card.card_id,
          card_name:card.card_name,
          email: card.email,
          phone: card.phone,
          job_title: card.job_title
        }));
  
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error in fetching card' });
    }
  };
export default getCardList; 
    