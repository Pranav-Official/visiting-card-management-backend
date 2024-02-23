import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';
import createNewCardService from './createNewCardService';

interface AcceptCardParams {
  cardData: Cards;
  card_id: string;
}

const acceptCardService = async ({ cardData, card_id }:  AcceptCardParams) => {
  try {

    const oldCardId = card_id;
    const success = await createNewCardService(cardData);
     console.log('cardData:',cardData);
   
    if (success.success) {
      const cardId = success.card_id;
      console.log('cardId:',cardId)
      const newStatus = 'accepted';

      //Find the user_id of the receiver using the received card_id
      const sharedCard = await SharedCards.findOne({
        attributes: ['user_id'],
        where: { card_id: oldCardId },
      });

      //Change the shared_or_not status in cards table
      await Cards.update(
        { shared_or_not: 1 }, 
        { where: { card_id: cardId } }
      );

      //updating the user_id of the newly created card
      if (sharedCard && sharedCard.user_id) {
        await Cards.update(
          { user_id: sharedCard.user_id, modifiedAt: new Date() },
          { where: { card_id: cardId } },
        );

        //Update the pending status in sharedCard table
        const updatedCard = await SharedCards.update(
          { status: newStatus, modifiedAt: new Date() },
          { where: { card_id: cardId } },
        );

        return updatedCard;
      } else {
        console.error('Error retrieving user_id from SharedCards');
        return{ error:'Error retrieving user_id from SharedCards'};
      }
    } else {
      console.error('Error creating new card');
     return{error:'Error creating new card'};
    }
  } catch (error) {
    console.error('Error accepting card:', error);
    return {error:error.message}
  }
};

export default acceptCardService;
