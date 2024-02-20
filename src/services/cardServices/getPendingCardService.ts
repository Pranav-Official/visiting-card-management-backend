import Cards from "../../models/cards";
import SharedCards from "../../models/sharedCards";

//Function to get the pending card list and its details

const getPendingCardsService = async (userId: string): Promise<any> => {

   try {
    if (!userId) {
       throw new Error('User ID is missing in the request.');
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
            'user_id'
          ],
        }
      ],
    });

    return {
      hasPendingCards: pendingCards.length > 0,
      message: pendingCards.length > 0 ? 'Pending cards found' : 'No pending cards found',
      pendingCards: pendingCards.map(card => card.toJSON()),
    };

  } catch (error) {
    console.error('Error fetching pending cards:', error);
    return { hasPendingCards: false, message: 'Internal Server Error' };
  }
};

export default getPendingCardsService;

