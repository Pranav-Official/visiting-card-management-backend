//To accept the shared cards

import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';
import createNewCardService from './createNewCardService';

interface AcceptCardParams {
  cardData: Cards;
  card_id: string;
  user_id: string;
}

const acceptCardService = async ({
  cardData,
  card_id,
  user_id,
}: AcceptCardParams) => {
  try {
    const oldCardId = card_id;
    const receiverId = user_id;
    const success = await createNewCardService(cardData);

    if (success.success) {
      const cardId = success.card_id;
      console.log('cardId:', cardId);
      const newStatus = 'accepted';

      //Change the shared_or_not status in cards table
      await Cards.update({ shared_or_not: 1 }, { where: { card_id: cardId } });

      //updating the user_id of the newly created card
      if (receiverId) {
        await Cards.update(
          { user_id: receiverId, modifiedAt: new Date() },
          { where: { card_id: cardId } },
        );

        //Update the pending status in sharedCard table
        const updatedCard = await SharedCards.update(
          { status: newStatus, modifiedAt: new Date() },
          { where: { card_id: oldCardId } },
        );
        console.log(updatedCard);

        return updatedCard;
      } else {
        console.error('Error retrieving user_id from SharedCards');
        return { error: 'Error retrieving user_id from SharedCards' };
      }
    } else {
      console.error('Error creating new card');
      return { error: 'Error creating new card' };
    }
  } catch (error) {
    console.error('Error accepting card:', error);
    return { error: error.message };
  }
};

export default acceptCardService;
