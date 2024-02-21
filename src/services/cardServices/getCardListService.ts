
import { Op } from 'sequelize';
import Cards from '../../models/cards';

type returnObjectType = {
  status: boolean;
  message: Object;
};
const getCardListService = async (card_id: string): Promise<returnObjectType>  => {
  try {
    
    // Check if the card id is existing in Cards table
    const cardIdFound = await Cards.findOne({
      where: { card_id: card_id },
      raw: true,
    });
    //console.log(cardIdFound);
    if (!cardIdFound) {
      return {status:false,message:{error:"card id not found"}}
    } else {
      //To get cards under a specific contact
      const cardList = await Cards.findAll({
        where: {
          [Op.or]: [{ card_id: card_id }, { parent_card_id: card_id }],
        },
        attributes: [
          'card_id',
          'card_name',
          'email',
          'phone',
          'job_title',
          'company_name',
        ],
        raw: true,
      });

      // Extracting properties from each card
      const response = cardList.map((card) => ({
        card_id: card.card_id,
        card_name: card.card_name,
        email: card.email,
        phone: card.phone,
        job_title: card.job_title,
        company_name: card.company_name,
      }));
      return {status:true,message:response}
      
    }
  } catch (error) {
    console.error(error);
    return {status:false,message:{error:"Error in fetching card"}}; // Failure
  }
};
export default getCardListService;
